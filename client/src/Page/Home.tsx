import React, { Suspense } from 'react'
import Hero from '../Components/Hero/hero'

const Post = React.lazy(() => import('../Components/Posts/Posts'))

const Home = ({ status }: { status: string }) => {
    return (
        <>
            <Hero/>
            <Suspense fallback={<div className='posts load'>Loading Posts...</div>}>
                <Post status={status} />
            </Suspense>
        </>
    )
}

export default Home