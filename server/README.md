Backend Part of the Project

Check the Frontend Part here [Link](https://github.com/Remiferiaa/blog-api/tree/main/client)

# Installation
1. Clone the repo

    ```
    https://github.com/Remiferiaa/blog-api.git
    cd blog-api/server
    ```
2. Run npm install
3. Create a .env file with the following fields

    ```
    DB=Your mongodb url here
    SECRET= Your Secret Key Here
    ```
4. In Your Mongodb collection create a collection called users and in it create a document with the following fields 

    ```
    username: your username here
    password: your password here
    ```

# Endpoints
| Description                   | Method  | URL                                    |
| ----------------------------- | ------- | -------------------------------------- |
| Login                         | POST    | /login                                 |
| Verify                        | POST    | /verify                                |
| Get All Posts                 | GET     | /api/posts                             |
| Get Specific Post             | GET     | /api/posts/:postid                     |
| Get All Comments of a post    | GET     | /api/posts/:postid/comments            |
| Get Specific Comment          | GET     | /api/posts/:postid/comments/:commentid |
| Create New Post               | POST    | /api/posts                             |
| Comment in a post             | POST    | /api/posts/:postid/comments            |
| Edit Post                     | PUT     | /api/posts/:postid                     |
| Delete post                   | DELETE  | /api/posts/:postid                     |
| Delete Comment                | DELETE  | /api/posts/:postid/comments/:commentid |

