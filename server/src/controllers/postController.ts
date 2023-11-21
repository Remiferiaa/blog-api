import message from '../models/message'
import posts from '../models/posts'
import { Request, Response, NextFunction } from 'express'
import { body, validationResult } from 'express-validator'

export const postlist_get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const content = await posts.find({}, '-__v').exec()
        if (content.length) {
            return res.status(200).json({
                content
            })

        }
        res.status(404).json({
            error: 404,
            message: 'No Posts Found'
        })
    } catch (err) {
        next(err)
    }
}

export const postlist_post = [
    body('postTitle').trim().isLength({ min: 1 }).escape().withMessage("Title can't be empty"),
    body('postBody').trim().isLength({ min: 1 }).escape().withMessage("Body can't be empty"),

    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { postTitle, postBody } = req.body
            const errors = validationResult(req)
            const post = new posts({
                postTitle,
                postBody
            })
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array()
                })
            }
            post.save((err) => {
                if (err) {
                    return next(err)
                }
                res.status(200).json({
                    message: 'Post Created Succesfully'
                })
            })
        }
        catch (err) {
            next(err)
        }
    }
]

export const post_get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const content = await posts.findById(req.params.postid, '-__v').exec()
        if (!content) {
            return res.status(404).json({
                error: 404,
                message: 'Post Not Found'
            })
        }
        res.status(200).json({
            content
        })
    } catch (err) {
        next(err)
    }
}

export const post_put = [
    body('postTitle').trim().isLength({ min: 1 }).escape().withMessage("Title can't be empty"),
    body('postBody').trim().isLength({ min: 1 }).escape().withMessage("Body can't be empty"),

    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { postTitle, postBody } = req.body
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array()
                })
            }
            posts.findByIdAndUpdate(req.params.postid, { postTitle: postTitle, postBody: postBody }, {}, function (err, result) {
                if (err) {
                    return res.status(400).json({
                        message: 'Post Update Failed',
                    })
                }
                res.status(200).json({
                    message: 'Post Sucessfully Updated'
                })
            })
        }
        catch (err) {
            next(err)
        }
    }
]

export const post_delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const content = await posts.findById(req.params.postid).exec()
        const deletePost = await content!.deleteOne()
        if (!deletePost) {
            return res.status(400).json({
                message: 'Post failed to delete'
            })
        }
        res.status(200).json({
            message: 'Post Sucessfully Deleted along with all associated comments'
        })
    } catch (err) {
        next(err)
    }
}


export const post_commentlist_get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const content = await message.find({ post: req.params.postid }, '-__v -post').exec()
        if (!content.length) {
            return res.status(404).json({
                error: 404,
                message: 'No comments found in this post'
            })
        }
        res.status(200).json({
            comments: content
        })
    } catch (err) {
        next(err)
    }
}

export const post_commentlist_post = [
    body('postedBy').trim().isLength({ min: 1 }).escape().withMessage("Username can't be empty"),
    body('msgBody').trim().isLength({ min: 1 }).escape().withMessage("Body can't be empty"),

    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { postedBy, msgBody } = req.body
            const errors = validationResult(req)
            const msg = new message({
                postedBy,
                msgBody,
                post: req.params.postid
            })
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array()
                })
            }
            msg.save((err) => {
                if (err) {
                    return next(err)
                } else {
                    posts.findByIdAndUpdate({ _id: req.params.postid }, { $push: { postComments: msg } }, function (err, result) {
                        if (err) {
                            return next(err)
                        }
                        res.status(200).json({
                            message: 'Message created succesfully'
                        })
                    })
                }
            })

        }
        catch (err) {
            next(err)
        }
    }
]

export const post_comment_get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const content = await message.findById(req.params.commentid, '-__v -post').exec()
        if (!content) {
            return res.status(404).json({
                error: 404,
                message: 'Comment Not Found'
            })
        }
        res.status(200).json({
            content
        })
    } catch (err) {
        next(err)
    }
}

export const post_comment_delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const content = await message.findById(req.params.commentid).exec()
        const deleteMsg = await content?.deleteOne()
        if (!deleteMsg) {
            return res.status(400).json({
                message: 'Failed to delete comment'
            })
        }
        res.status(200).json({
            message: 'Comment Deleted Sucessfully'
        })
    } catch (err) {
        next(err)
    }
}
