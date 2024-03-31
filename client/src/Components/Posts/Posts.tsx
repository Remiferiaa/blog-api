import { useEffect } from 'react'
import useLink from '../../Hook/useLink'
import { Link } from 'react-router-dom'

const Posts = ({ status }: { status: string }) => {
    const { postList, getPosts } = useLink()

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <div className='container'>
            <div className='posts'>
                {postList.slice().reverse().map((items) => {
                    return (
                        <div key={items._id} className='post'>
                            <Link to={`/${status}/${items._id}`} className='relative'>
                                <p className='post-date'>{items.published}</p>
                                <p className='post-title'>{items.postTitle}</p>
                                <p className='post-body'>{items.postBody}</p>
                                <p className='post-comments'>{items.commentCount} Comments</p>
                            </Link>
                            <hr />
                        </div>

                    )
                })}
            </div >
        </div>
    )
}

export default Posts