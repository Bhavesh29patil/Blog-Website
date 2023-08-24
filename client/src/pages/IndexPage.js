import { useEffect, useState, useContext } from "react"
import Post from "../Post"
import Welcome from "../Welcome";
import { UserContext } from "../UserContext";
import SignAndLog from "../SignAndLog";

const IndexPage = () => {
    const [posts, setPosts] = useState([]);
    let [valid, setIsValid] = useState(false);
    useEffect(() => {
        fetch('http://localhost:8000/post')
        .then(response => {
            response.json().then(posts => {
                setPosts(posts);
            })
        })
    }, [])
    
    const { setUserinfo, userinfo } = useContext(UserContext)
    useEffect(()=>{
        if(userinfo && userinfo.username ){
            setIsValid(true)
        }
        else{
            setIsValid(false)
        }
    },[userinfo])

    return (
        <>
            {userinfo && userinfo.username ? <Welcome /> : <SignAndLog />}
        {posts ? <h2 class="h2blog">Latest Blog Post</h2> : <h2>Zero Blogs</h2>}
            <div className="main">
                <div className="container">
                    <div class="blog">


                        <div class="blog-card-group">
                            {posts.length > 0 && posts.map(post => (
                                <Post {...post} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default IndexPage