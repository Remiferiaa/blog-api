import express from 'express'
import { postlist_get, postlist_post, post_commentlist_get, post_commentlist_post, post_comment_delete, post_comment_get, post_delete, post_get, post_put } from '../controllers/postController';

const router = express.Router();

router.route('/posts')
    .get(postlist_get)
    .post(postlist_post)

router.route('/posts/:postid')
    .get(post_get)
    .put(post_put)
    .delete(post_delete)

router.route('/posts/:postid/comments')
    .get(post_commentlist_get)
    .post(post_commentlist_post)

router.route('/posts/:postid/comments/:commentid')
    .get(post_comment_get)
    .delete(post_comment_delete)

export default router;
