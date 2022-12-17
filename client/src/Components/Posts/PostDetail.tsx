import React, { Suspense, useEffect } from 'react'
import useLink from '../../Hook/useLink'
import { useParams } from 'react-router-dom'

const Comments = React.lazy(() => import('../Comments/Comments'))
const PostDetails = () => {
    const curPost = useParams()
    const { getPostDetail, data } = useLink()

    useEffect(() => {
        getPostDetail(curPost.postid!)
    }, [curPost.postid])

    return (
        <>
            <div className='container comms'>
                <article>
                    <div>
                        <h1>{data?.postTitle}</h1>
                        <time>{data?.published}</time>
                    </div>
                    <p>{data?.postBody}</p>
                </article>
                <hr />
                <Suspense fallback={<p>Loading Comments...</p>}>
                    <Comments />
                </Suspense>
            </div>
        </>
    )
}

export default PostDetails