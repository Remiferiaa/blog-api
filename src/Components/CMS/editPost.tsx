import React, { useEffect, useState } from 'react'
import useLink from '../../Hook/useLink'
import { useParams, useNavigate } from 'react-router-dom'
import useCms from '../../Hook/useCms'
import axios from 'axios'

const PostEdit = () => {
    const curPost = useParams()
    const navigate = useNavigate()
    const { getPostDetail, data, comments, getComments, setComments } = useLink()
    const { editPosts, deletePost, deleteComments } = useCms()
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [err, setErr] = useState('')

    useEffect(() => {
        getPostDetail(curPost.postid!)
        getComments(curPost.postid!)
    }, [curPost.postid])

    useEffect(() => {
        if (data) {
            setTitle(data.postTitle)
            setBody(data.postBody)
        }
    }, [data])

    async function submit(e: React.FormEvent) {
        try {
            e.preventDefault()
            await editPosts(curPost.postid!, title, body)
            navigate('/')
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setErr(err.response?.data.message)
            } else {
                console.error(err)
            }
        }
    }
    async function delPost() {
        try {
            await deletePost(curPost.postid!)
            navigate('/')
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setErr('Unauthorized')
            }
        }
    }

    async function delComm(id: string) {
        try {
            await deleteComments(curPost.postid!, id)
            setComments(prev => prev.filter(item => item._id !== id))
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setErr('Unauthorized')
            } 
        }
    }

    return (
        <>
            <div className='cms-post-container'>
                <form onSubmit={(e) => submit(e)} className='edit-form'>
                    <label htmlFor="postTitle">Title:</label>
                    <input type='text' id='postTitle' name='postTitle' required autoComplete='off' value={title} onChange={(e) => setTitle(e.target.value)} />
                    <label htmlFor="postBody">Content:</label>
                    <textarea id='postBody' name='postBody' required value={body} onChange={(e) => setBody(e.target.value)}/>
                    <div className='form-btn'>
                        <button className='edit-btn'>Update</button>
                        <button className='del-btn' type='button' onClick={() => delPost()}>Delete</button>
                    </div>
                </form>
                {err ? <p className='err-msg'>{err}</p> : <></>}
                <hr />
                <div className='comm-holder'>
                    {comments.length > 0 ? comments.map((comm) => {
                        return (
                            <div key={comm._id} className='comm-container'>
                                <p className='comm-user'>{comm.postedBy}</p>
                                <p className='comm-msg'>{comm.msgBody}</p>
                                <button className='del-btn' onClick={() => delComm(comm._id)}>Delete</button>
                            </div>
                        )
                    }) : <p>No Comments Found</p>}
                </div>
            </div>
        </>
    )
}

export default PostEdit