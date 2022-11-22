import express from 'express'

const router = express.Router();

router.get('/posts')

router.post('/posts')

router.get('/posts/:postid')

router.put('/posts/:postid')

router.delete('/posts/:postid')

router.get('/posts/:postid/comments')

router.post('/posts/:postid/comments')

router.get('/posts/:postid/comments/:commentid')

router.delete('/posts/:postid/comments/:commentid')

export default router;
