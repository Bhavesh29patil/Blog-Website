import React , {useState , useEffect} from 'react'
import Post from '../Post';
import { useParams } from 'react-router-dom';

const AuthorPage = () => {
    const [posts , setPosts] = useState([]);
    const { username } = useParams();
    useEffect(()=> {
        fetch(`http://localhost:8000/author/${username}`)
        .then(response => {
            response.json().then(posts => {
                setPosts(posts);
            })
        })
    }, [username])
        return(
            <>
            <h2>Blogs of {username}</h2>
            {posts.length > 0 && posts.map(post => (
                <Post {...post} />
            ))}
            </>
        )
}

export default AuthorPage