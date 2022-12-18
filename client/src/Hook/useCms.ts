import axios from "axios";

function useCms() {
    const baseURL = process.env.REACT_APP_URL
    const config = {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    }

    function login(username: string, password: string) {
        return axios.post(`${baseURL}/login`, { username, password })
    }

    function newPosts(postTitle: string, postBody: string) {
        return axios.post(`${baseURL}/api/posts/`, { postTitle, postBody }, config)
    }

    function editPosts(postid: string, postTitle: string, postBody: string) {
        return axios.put(`${baseURL}/api/posts/${postid}`, { postTitle, postBody }, config)
    }

    function deletePost(postid: string) {
        return axios.delete(`${baseURL}/api/posts/${postid}`, config)
    }

    function deleteComments(postid: string, commentid: string) {
        return axios.delete(`${baseURL}/api/posts/${postid}/comments/${commentid}`, config)
    }

    return { login, newPosts, editPosts, deletePost, deleteComments }
}

export default useCms

