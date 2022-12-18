import React, { useEffect, useState } from 'react'
import useLink from '../../Hook/useLink'
import { useParams } from 'react-router-dom'
import useCms from '../../Hook/useCms'
import { IPost } from '../../types/db'

const PostEdit = () => {
    const curPost = useParams()
    const { getPostDetail, data, comments, getComments } = useLink()
    const { editPosts, deletePost, deleteComments } = useCms()
    const [title, setTitle] = useState<string>()
    const [body, setBody] = useState<string>()

    useEffect(() => {
        getPostDetail(curPost.postid!)
        getComments(curPost.postid!)
        setTitle(data?.postTitle)
        setBody(data?.postBody)
    }, [curPost.postid])

    function submit(e: React.FormEvent) {
        e.preventDefault()
    }

    return (
        <>
            <div className='cms-post-container'>
                <form onSubmit={(e) => submit(e)} className='edit-form'>
                    <label htmlFor="postTitle">Title:</label>
                    <input type='text' id='postTitle' name='postTitle' required autoComplete='off' value={title} onChange={(e) => setTitle(e.target.value)} />
                    <label htmlFor="postBody">Content:</label>
                    <textarea id='postBody' name='postBody' required value={body} onChange={(e) => setBody(e.target.value)}/>
                    <button className='edit-btn'>Update</button>
                    <button className='del-btn' type='button' onClick={() => deletePost(curPost.postid!)}>Delete</button>
                </form>
                <hr />
                <div>
                    {comments.length > 0 ? comments.map((comm) => {
                        return (
                            <div key={comm._id} className='comm-container'>
                                <p className='comm-user'>{comm.postedBy}</p>
                                <p className='comm-msg'>{comm.msgBody}</p>
                                <button onClick={() => deleteComments(curPost.postid!, comm._id)}>Delete</button>
                            </div>
                        )
                    }) : <p>No Comments Found</p>}
                </div>
            </div>
        </>
    )
}

export default PostEdit