import React, {useState } from 'react'
import { useParams } from 'react-router-dom'
import useCms from '../../Hook/useCms'

const NewPost = () => {
    const curPost = useParams()
    const { newPosts } = useCms()
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    function submit(e: React.FormEvent) {
        e.preventDefault()
        newPosts(curPost.id!, title, body)
    }

    return (
        <>
            <div className='cms-post-container'>
                <form onSubmit={(e) => submit(e)} className='edit-form'>
                    <label htmlFor="postTitle">Title:</label>
                    <input type='text' id='postTitle' name='postTitle' required autoComplete='off' value={title} onChange={(e) => setTitle(e.target.value)} />
                    <label htmlFor="postBody">Content:</label>
                    <textarea id='postBody' name='postBody' required value={body} onChange={(e) => setBody(e.target.value)}/>
                    <button className='edit-btn'>Post</button>
                </form>
            </div>
        </>
    )
}

export default NewPost