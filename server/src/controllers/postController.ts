import message from '../models/message'
import posts, { IPosts } from '../models/posts'
import { Request, Response, NextFunction } from 'express'
import { body, validationResult } from 'express-validator'


export const postlist_get = async (req: Request, res: Response, next: NextFunction) => {
    const content = await posts.find().populate('postComments').exec()

    if (content.length) {
        return res.status(200).json({
            content
        })

    }
    return res.status(404).json({
        error: 404,
        message: 'No Posts Found'
    })
}

export const postlist_post = [
    body('postTitle').trim().isLength({ min: 1 }).escape().withMessage("Title can't be empty"),
    body('postBody').trim().isLength({ min: 1 }).escape().withMessage("Body can't be empty"),

    (req: Request, res: Response, next: NextFunction) => {
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
        } else {
            post.save((err) => {
                if (err) {
                    return next(err)
                }
                res.status(200).json({
                    message: 'post succesfully created'
                })
            })
        }
    }
]

export const post_get = async (req: Request, res: Response, next: NextFunction) => {
    const content = await posts.findById(req.params.postid).exec()

    if (!content) {
        return res.status(404).json({
            error: 404,
            message: 'Post Not Found'
        })
    }
    res.status(200).json({
        content
    })
}

export const post_put = [
    body('postTitle').trim().isLength({ min: 1 }).escape().withMessage("Title can't be empty"),
    body('postBody').trim().isLength({ min: 1 }).escape().withMessage("Body can't be empty"),

    (req: Request, res: Response, next: NextFunction) => {
        const { postTitle, postBody } = req.body
        const errors = validationResult(req)
        const post = new posts({
            postTitle,
            postBody,
            _id: req.params.postid
        })
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        } else {
            posts.findByIdAndUpdate(req.params.postid, post, {}, function (err, result) {
                if (err) {
                    return res.status(400).json({
                        message: 'Post Update Failed',
                        test: req.params
                    })
                }
                res.status(200).json({
                    message: 'Post Sucessfully Updated'
                })
            })
        }
    }
]

export const post_delete = async (req: Request, res: Response, next: NextFunction) => {
    const content = await posts.findById(req.params.postid ).exec()
    const deletePost = await content!.deleteOne()
    if (!deletePost) {
        return res.status(400).json({
            message: 'delete failed'
        })
    }
    res.status(200).json({
        message: 'Post Sucessfully Deleted along with all associated comments'
    })
}


export const post_commentlist_get = async (req: Request, res: Response, next: NextFunction) => {
    const content = await posts.findById(req.params.postid).populate('postComments').exec()
    if (!content) {
        return res.status(404).json({
            error: 404,
            message: 'Comments in Post Not Found'
        })
    }
    res.status(200).json({
        comments: content.postComments
    })
}

export const post_commentlist_post = [
    body('msgTitle').trim().isLength({ min: 1 }).escape().withMessage("Title can't be empty"),
    body('msgBody').trim().isLength({ min: 1 }).escape().withMessage("Body can't be empty"),

    (req: Request, res: Response, next: NextFunction) => {
        const { msgTitle, msgBody } = req.body
        const errors = validationResult(req)
        const msg = new message({
            msgTitle,
            msgBody,
            post: req.params.postid
        })
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        } else {
            msg.save((err) => {
                if (err) {
                    return next(err)
                } else {
                    posts.findOneAndUpdate({ _id: req.params.postid }, { $push: { postComments: msg } }, function (err: Error, result: IPosts) {
                        if (err) {
                            return next(err)
                        }
                        res.status(200).json({
                            message: 'message succesfully created'
                        })
                    })
                }
            })
        }
    }
]

export const post_comment_get = async (req: Request, res: Response, next: NextFunction) => {
    const content = await message.findById(req.params.commentid).exec()
    if (!content) {
        return res.status(404).json({
            error: 404,
            message: 'Comment Not Found'
        })
    }
    res.status(200).json({
        content
    })
}

export const post_comment_delete = (req: Request, res: Response, next: NextFunction) => {
    message.findByIdAndDelete({ _id: req.params.commentid }, {}, function (err, result) {
        if (err) {
            res.status(400).json({
                message: 'delete failed'
            })
        } else {
            res.status(200).json({
                message: 'Comment Deleted Sucessfully'
            })
        }
    })
}