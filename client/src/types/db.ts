export interface IPost {
    _id: string,
    postTitle: string,
    postBody: string,
    postComments: string[]
    postedAt: string,
    published: string,
    commentCount: number
}

export interface IComments {
    _id: string
    msgTitle: string,
    msgBody: string,
    postedAt: string,
    posted: string
}
