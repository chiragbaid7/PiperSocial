# Hosted Here
https://pipersocial.netlify.app/

# Walk through

https://user-images.githubusercontent.com/37933427/145869384-7678b5bb-4dc3-41e7-9a87-0e3dbfcb815f.mp4

# Tech Stack
![ExpressJS](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge) ![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![SQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![AWS](https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white) ![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white) ![image](https://camo.githubusercontent.com/44b6b5073fe4e7788180a0b840060d350cc756ad9745d2f269fad7d48e54b948/68747470733a2f2f63646e2e737667706f726e2e636f6d2f6c6f676f732f6a77742e737667)

# Project Directory Structure
```
│
├── src
|   ├── API
|   |   ├── routes
│   │   │   └── v1
|   |   |      ├── user 
|   |   |      |   ├── userRoutes.js
|   |   |      |   └── schema.js
|   |   |      ├── posts
|   |   |      |   ├── postsRoute.js
│   │   |      |   └── schema.js  
│   │   │      ├── index.js
│   │   │      └── followRoute.js
|   |   └── controller
│   │       └── v1
|   |          ├── postsHandler.js
|   |          ├── userHandler.js
|   |          └── followHandler.js         
|   ├── domain
│   │   ├── models
|   |   |   ├── sequilze
|   |   |   │   ├── index.js
|   |   |   │   ├── followModel.js
│   │   |   │   ├── postsModel.js
|   |   |   │   └── userModel.js
|   |   |   └── database.js
│   │   └── data-access / repository
|   |       ├── userData.js
|   |       ├── followData.js
|   |       └── postsData.js
│   ├── storage
│   │   └── AWS_S3.js
│   ├── service
|   |   ├── postsService.js
|   |   ├── FollowSerivice.js
│   │   └── UserService.js
|   |   
│   ├── middleware / helpers
|   |   ├── validation.js
│   │   ├── auth.js
│   │   └── ErrorHandler.js 
|   ├── utils
|   |   ├── Error
|   |   │   ├── ApplicationError.js
|   |   │   ├── errorFactory.js
|   |   │   ├── customError.js
|   |   │   └── commonError.js
|   |   └── Response 
|   |       └── response.js
│   ├── config
│   │   └── index.js
│   │  
├── app.js
├── package.json
├── Readme.md
├── package-lock.json

```

# System Design

## Backend Architecture

![anatomy](https://user-images.githubusercontent.com/37933427/148992426-ce697f71-37b8-413b-905f-f3b5c8fffdfd.png)
<details>
    <summary>Diagram Code</summary>
    
    Title: Backend Architecture
    participant client
    participant web server as webserver
    participant controller
    participant service
    participant domain
    participant storage

    client -> webserver:  POST /api/v1/Posts
    webserver -> controller: post_handler()
    controller -> service: post_service()
    service -> storage: upload_AWS(image)
    service -> domain: post_domain(id)
    domain -> service: domain_model
    service -> controller: domain_model
    controller -> webserver: JSON or HTML Response
    webserver -> client: HTTP Response
 </details>
 
## Database Schema
![](server/Piper.png)

## REST API


    POSTS API

     get a list of current user's posts             GET      http:://api/v1/users/posts

     get a particular post                          GET      http:://api/v1/users/posts/{post_id}

     get current user's friends posts                       GET      http:://api/v1/users/posts/following

     create a post                                  POST     http:://api/v1/users/posts

     delete a post                                  DELETE   http:://api/v1/users/posts/{post_id}

     get a list of user's posts                     GET      http:://api/v1/users/{user_id}/posts


    COMMENT API

     get all comments on a post                     GET      http:://api/v1/users/posts/{post_id}/comments

     create a comment on a post                     POST     http:://api/v1/users/posts/{post_id}/comments

     delete a comment of a post                     DELETE   http:://api/v1/users/comments/{comment_id}

    LIKES API

     like  a post                                   PUT      http:://api/v1/users/posts/{post_id}/likes

     unlike a post                                  DELETE   http:://api/v1/users/posts/{posts_id}/likes

     List of users who have liked the post          GET      http:://api/v1/users/posts/{post_id}/likes

    FOLLOW API

      follow a user                                  PUT      http:://api/v1/users/following/{friend_id}

      unfollow a user                                DELETE   http:://api/v1/users/following/{friend_id}

      get all users I follow                         GET      http:://api/v2/users/following

##  System APIs Examples

- createUser(name,email,password)
  - Response Body: 200
    ```json
    {
        "result": {
            "user_id": 5
        },
        "success": true,
        "Token": "jwtToken"
    }
    ```
    
- createUser(email,password)
  - Response Body: 400
    ```json
    {
    "error": {
        "name": "AppError",
        "type": "APP_NAME",
        "code": "VALIDATION_ERROR",
        "message": "\"name\" is required",
        "statusCode": 400,
    },
    "success": false
    }
    ```
 
 # Features
 - Users can submit text or images as posts.
 - Users feed are populated of people they are following sorted by latest posts on top.
 - Users can follow each other.
 - Users can likes posts.
 - JWT Tokens, make requests with a token after login with `Authorization` header with value `Bearer` yourToken where yourToken is 
   the signed and encrypted token given in the response from the login process.
   
 # Future enhancements.
 - Users should be able to submit both texts and images together as multi-form data.
 - Users should be able to see the preview of the image after uploading in the frontend (Image can be stored as blob).
 - Users should be able to submit video contents as well.
 - Improve UI and add more features.
