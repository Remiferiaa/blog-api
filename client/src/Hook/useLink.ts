import axios from "axios";
import {useState } from 'react'
import { IPost, IComments } from "../types/db";

function useLink() {
    const baseURL = process.env.REACT_APP_URL
    const [postList, setPostList] = useState<IPost[] | []>([])
    const [comments, setComments] = useState<IComments[] | []>([])
    const [data, setData] = useState<IPost>()

    async function getPosts() {
        try {
            const res = await axios.get(`${baseURL}/api/posts`)
            const content = await JSON.parse(JSON.stringify(res.data))
            setPostList(content.content)
        } catch (err) {
            console.error(err)
        }
    }

    async function getPostDetail(postid: string) {
        try {
            const res = await axios.get(`${baseURL}/api/posts/${postid}`)
            const content = await JSON.parse(JSON.stringify(res.data))
            setData(content.content)
        } catch (err) {
            console.error(err)
        }
    }

    async function getComments(postid: string) {
        try {
            const res = await axios.get(`${baseURL}/api/posts/${postid}/comments`)
            const content = await JSON.parse(JSON.stringify(res.data))
            setComments(content.comments)
        } catch (err) {
            console.error(err)
        }
    }

    async function newComments(postid: string, postedBy: string, msgBody: string) { 
        try {
            await axios.post(`${baseURL}/api/posts/${postid}/comments`, {postedBy, msgBody})
            getComments(postid)
        } catch (err) {
            console.error(err)
        }
    }

    return { getPosts, getPostDetail, getComments, newComments, postList, comments, data}
}

export default useLink

