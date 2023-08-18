require('dotenv').config({ path: '../.env' });
const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcryptjs');
const User = require('./models/User')
const Post = require('./models/Post');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const fs = require('fs');
const path = require('path');


app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const salt = bcrypt.genSaltSync(10);
const secret = "jdsfjsdkjfjdsfj";

const PORT = 8000;
mongoose.connect(process.env.MONGO_URL)

app.post('/register', async (req, res) => {

    const { username, password } = req.body;
    try {
        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt),
        })
        res.json(userDoc)
        // res.cookie('token' , token).json(userDoc);
    }
    catch (e) {
        res.status(400).json(e.message);
        console.log(e)
    }
})

app.post('/login', async (req, res) => {

    const { username, password } = req.body;
    const userDoc = await User.findOne({ username });
    const passOk = userDoc && bcrypt.compareSync(password, userDoc.password)
    if (passOk) {
        jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
            if (err) throw err
            res.cookie('token', token).json({
                id: userDoc._id,
                username,
            })
        })
    }
    else {
        res.status(400).json('WRONG CREDENTIALS')
    }

})

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err
        res.json(info)
    })
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok')
})

app.post('/post', upload.single('file'), async (req, res) => {
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext
    fs.renameSync(path, newPath)

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err
        const { title, summary, content } = req.body;
        const postDoc = await Post.create({
            title: title,
            summary,
            content,
            cover: newPath,
            author: info.id
        })
        res.json({ postDoc })
    })
})

app.put('/post', upload.single('file'), async (req, res) => {
    let newPath = null;
    if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path + '.' + ext
        fs.renameSync(path, newPath)
    }

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err
        const { id, title, summary, content } = req.body;
        const postDoc = await Post.findById(id)
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
        if (!isAuthor) {
            return res.status(400).json('You are not the author of this')
        }

        const response = await postDoc.updateOne({
            title,
            summary,
            content,
            cover: newPath ? newPath : postDoc.cover
        })
        res.json(postDoc);
    })
})

app.get('/post', async (req, res) => {
    res.json(
        await Post.find()
            .populate('author', ['username'])
            .sort({ createdAt: -1 })
            .limit(15)
    );
})

app.get('/post/:id', async (req, res) => {
    const { id } = req.params;
    const postDoc = await Post.findById(id).populate('author', ['username'])
    res.json(postDoc);
})

app.get('/author/:username', async (req, res) => {
    const { username } = req.params;
    const authorPosts = await Post.find()
        .populate({
            path: 'author',
            select: 'username',
            match: { username }
        })
        .sort({ createdAt: -1 })
        .limit(15)

    const filteredPosts = authorPosts.filter(post => post.author !== null);

    res.json(filteredPosts);
})


app.delete('/post/:id', async (req, res) => {
    const postId = req.params.id;
    const { token } = req.cookies;

    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        try {
            const postDoc = await Post.findById(postId);
            if (!postDoc) {
                return res.status(404).json({ message: 'Post not found' });
            }
            const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
            if (!isAuthor) {
                return res.status(403).json({ message: 'You are not the author of this post' });
            }
            const response = await postDoc.deleteOne();
            res.json({ message: "deleted successfully" })
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    });
});



app.listen(PORT);
