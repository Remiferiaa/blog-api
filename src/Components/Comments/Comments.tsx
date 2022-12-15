import React, { useEffect, useState } from 'react'
import useLink from '../../Hook/useLink'
import { useParams } from 'react-router-dom'

const Comments = () => {
    const curPost = useParams()
    const { comments, getComments, newComments } = useLink()
    const [poster, setPoster] = useState('')
    const [postBody, setPostBody] = useState('')

    useEffect(() => {
        getComments(curPost.postid!)
    }, [comments])

    function submit(e: React.FormEvent) {
        e.preventDefault()
        newComments(curPost.postid!, poster, postBody)
        setPoster('')
        setPostBody('')
    }

    return (
        <div>
            <div>
                {comments.length > 0 ? comments.map((comm) => {
                    return (
                        <div key={comm._id}>
                            <div>
                                <p>Posted By: {comm.postedBy}</p>
                                <p>{comm.posted}</p>
                            </div>
                            <p>{comm.msgBody}</p>
                        </div>
                    )
                }) : <p>No Comments Found</p>}
            </div>
            <form onSubmit={(e) => submit(e)}>
                <label htmlFor="postedBy"></label>
                <input type='text' id='postedBy' name='postedBy' value={poster} onChange={(e) => setPoster(e.target.value)} />
                <label htmlFor="msgBody"></label>
                <input type='text' id='msgBody' name='msgBody' value={postBody} onChange={(e) => setPostBody(e.target.value)} />
                <button>Post</button>
            </form>
        </div>
    )
}

export default Comments