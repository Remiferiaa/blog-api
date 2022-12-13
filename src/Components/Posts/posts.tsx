import React, { useEffect, useState } from 'react'
import useLink from '../../Hook/useLink'
import { Link } from 'react-router-dom'

const Posts = () => {
    const { postList, getPosts } = useLink()

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <div>
            {postList.map((items) => {
                return (
                    <div key={items._id}>
                        <Link to={`/posts/${items._id}`} className='relative'>
                            <div>
                                <p>{items.postTitle}</p>
                            </div>
                            <div>
                                <p>{items.published}</p>
                                <p>{items.postBody}</p>
                                <p>{items.commentCount}</p>
                            </div>
                        </Link>
                    </div>
                )
            })}
        </div >
    )
}

export default Posts