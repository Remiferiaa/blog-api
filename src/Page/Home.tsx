import React, { Suspense } from 'react'

const Home = () => {
    const Hero = React.lazy(() => import('../Components/Hero/hero'))
    const Post = React.lazy(() => import('../Components/Posts/Posts'))

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