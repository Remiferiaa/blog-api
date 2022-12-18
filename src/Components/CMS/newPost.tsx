import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useCms from '../../Hook/useCms'


const NewPost = () => {
    const navigate = useNavigate()
    const { newPosts } = useCms()
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [err, setErr] = useState('')

    async function submit(e: React.FormEvent) {
        try {
            e.preventDefault()
            await newPosts(title, body)
            navigate('/')
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setErr(err.response?.data.message)
            } else {
                console.error(err)
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
                    <textarea id='postBody' name='postBody' required value={body} onChange={(e) => setBody(e.target.value)} />
                    <button className='edit-btn'>Post</button>
                    {err ? <p>{err}</p> : <></>}
                </form>
            </div>
        </>
    )
}

export default NewPost