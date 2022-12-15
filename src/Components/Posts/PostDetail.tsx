import React, { Suspense, useEffect } from 'react'
import useLink from '../../Hook/useLink'
import { useParams } from 'react-router-dom'

const PostDetails = () => {
    const curPost = useParams()
    const { getPostDetail, data } = useLink()
    const Comments = React.lazy(() => import('../Comments/Comments'))

    useEffect(() => {
        getPostDetail(curPost.postid!)
    }, [])

    return (
        <div>
            <article>
                <header>
                    <h1>{data?.postTitle}</h1>
                    <time>{data?.published}</time>
                </header>
                <p>{data?.postBody}</p>
            </article>
            <hr/>
            <Suspense fallback={<p>Loading Comments...</p>}>
                <Comments />
            </Suspense>
        </div>
    )
}

export default PostDetails