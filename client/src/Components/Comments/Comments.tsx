import React, { useEffect, useState } from 'react'
import useLink from '../../Hook/useLink'
import { useParams } from 'react-router-dom'

const Comments = () => {
    const curPost = useParams()
    const { comments, getComments, newComments} = useLink()
    const [poster, setPoster] = useState('')
    const [postBody, setPostBody] = useState('')

    useEffect(() => {
        getComments(curPost.postid!)
    }, [])

    function submit(e: React.FormEvent) {
        e.preventDefault()
        newComments(curPost.postid!, poster, postBody)
        setPoster('')
        setPostBody('')
    }

    return (
        <div>
            <div className='comm-holder'>
                {comments.length > 0 ? comments.map((comm) => {
                    return (
                        <div key={comm._id} className='comm-container' >
                            <div>
                                <div className='comm-info'>
                                    <p className='comm-user'>{comm.postedBy}</p>
                                    <p className='comm-date'>{comm.posted}</p>
                                </div>
                                <p className='comm-msg'>{comm.msgBody}</p>
                            </div>
                        </div>
                    )
                }) : <p>No Comments Found</p>}
            </div>
            <form onSubmit={(e) => submit(e)} className='comm-form'>
                <label htmlFor="postedBy">Name:</label>
                <input type='text' id='postedBy' name='postedBy' required placeholder='bob' autoComplete='off' value={poster} onChange={(e) => setPoster(e.target.value)} />
                <label htmlFor="msgBody">Comment:</label>
                <input type='text' id='msgBody' name='msgBody' required placeholder='nice post' autoComplete='off' value={postBody} onChange={(e) => setPostBody(e.target.value)} />
                <button className='comm-btn'>Post</button>
            </form>
        </div>
    )
}

export default Comments