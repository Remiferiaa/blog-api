import React, { Suspense } from 'react'
import Hero from '../Components/Hero/hero'

const Post = React.lazy(() => import('../Components/Posts/Posts'))

const Home = () => {
    return (
        <div>
            <Hero/>
            <Suspense fallback={<p>Loading Posts...</p>}>
                <Post />
            </Suspense>
        </div>
    )
}

export default Home