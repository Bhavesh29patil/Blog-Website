import { format } from 'date-fns'
import { Link } from 'react-router-dom'


const Post = ({ _id, title, summary, cover, content, createdAt, author }) => {
  return (
    <div className="blog-card">
      <div className="blog-card-banner">
        <Link to={`/post/${_id}`}>
          <img
            src={'http://localhost:8000/' + cover}
            alt=""
            width={250}
            className="blog-banner-img"
          />
        </Link>
      </div>
      <div className="blog-content-wrapper">
        {/* <button class="blog-topic text-tiny">Database</button> */}
        <h3>
          <Link className="h3" to={`/post/${_id}`}>
            {title}
          </Link>
        </h3>

        <p className="blog-text">
          {summary}
        </p>

        <div className="wrapper-flex">
          {/* <div class="profile-wrapper">
              <img src="./assets/images/author.png" alt="Julia Walker" width="50">
            </div> */}
          <div className="wrapper">
            <Link className='h4' to={`/author/${author.username}`}>
              {author.username}
            </Link>
            <p className="text-sm">
              <time>{format(new Date(createdAt), "MMM d, yyyy HH:mm")}</time>
            </p>
          </div>
        </div>
      </div>
    </div>

  )
}
export default Post;