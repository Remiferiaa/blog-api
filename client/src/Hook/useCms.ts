import axios from "axios";

function useCms() {
    const baseURL = process.env.REACT_APP_URL
    const config = {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
    }

    function login(username: string, password: string) {
        return axios.post(`${baseURL}/login`, {username, password})
    }

    async function newPosts(postid: string, postTitle: string, postBody: string) {
        try {
            await axios.post(`${baseURL}/api/posts/${postid}/comments`, {postTitle, postBody}, config)
        } catch (err) {
            console.error(err)
        }
    }

    async function editPosts(postid: string, postedBy: string, msgBody: string) {
        try {
            await axios.put(`${baseURL}/api/posts/${postid}/comments`, {postedBy, msgBody}, config)
        } catch (err) {
            console.error(err)
        }
    }

    async function deletePost(postid: string) {
        try {
            const res = await axios.delete(`${baseURL}/api/posts/${postid}`, config)
        } catch (err) {
            console.error(err)
        }
    }

    async function deleteComments(postid: string, commentid: string) { 
        try {
            await axios.delete(`${baseURL}/api/posts/${postid}/comments/${commentid}`, config)
        } catch (err) {
            console.error(err)
        }
    }

    return {login, newPosts, editPosts, deletePost, deleteComments}
}

export default useCms

