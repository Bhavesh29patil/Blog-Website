import React from 'react'
import { Link } from 'react-router-dom'

const SignAndLog = () => {
    return (
        <div className="hero">
            <div className="container">
                <div className="left">
                <h1 className="h1">Not Registered Yet?</h1>
                <Link className="btn btn-primary" to='/register'>Register Now</Link>
                <br></br>
                <br></br>
                <h1 className="h1">Already Have an Account </h1>
                <Link className="btn btn-secondary" to='/login'>Login</Link>
                <div className="btn-group">
                </div>
                </div>
            </div>
        </div>
    )
}

export default SignAndLog