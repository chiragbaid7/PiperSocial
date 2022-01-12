// This file contains the SQL quries. 
//const {Post} = require('../models/index');

const database = require('../models/database');
const {deleteobject} = require('../../storage/AWS_S3')

exports.create_post = async(post,user_id)=>{
    const data = await database.execute(
          `INSERT INTO posts(user_id,post) VALUES(?,?)`,
          [user_id,post]
    );
    return data[0].insertId;
}

exports.get_user_posts = async(user_id)=>{
    // get users posts + likes on the posts.
    const [data, _] = await database.execute(
      `SELECT post_id,post,created_at,(SELECT count(*) from likes 
      WHERE post_id=posts.post_id) as likes_count from posts
      WHERE user_id=? ORDER BY created_at DESC`,
      [user_id]
    );
    return data;
}

exports.getaPost = async(post_id)=>{
    const [data, _] = await database.execute(
      "SELECT user_id,post,created_at from posts WHERE post_id=?",
      [post_id]
    );
    return data;
}
exports.delete_a_post = async(post_id) =>{
    const data = await database.execute(
         `DELETE FROM posts WHERE post_id=?`,
         [post_id]
    );
    return data;
}
/*
exports.edit_a_post = async(post_id, data) =>{ 
    await Post.update({post:data},{
        where: {
        post_id: post_id
        }
    })
    return true;
}
*/
exports.getfriendsPosts = async(user_id)=>{

    //query to fetch user's friends posts for populating feeds
    const [data, _] = await database.execute(
        `SELECT post_id,user_id,name,post,created_at,
        (SELECT count(*) from likes WHERE post_id=posts.post_id) as likes_count
        FROM posts WHERE user_id IN(SELECT following_id FROM followers WHERE follower_id=?)
        ORDER BY created_at DESC `,[user_id]
    );
    return data;
}

exports.createcomment = async(user_id, post_id,comment) =>{
    //query perform SQL
    const data = await database.execute(
      `INSERT INTO comments(user_id,post_id,comment) VALUES(?,?,?)`,
      [user_id, post_id, comment]
    );
    return data[0].insertId;
}

exports.deletecomment = async(user_id, comment_id) => {

    const data = await database.execute(
      `DELETE FROM comments WHERE comment_id=? and user_id=?`,
      [comment_id, user_id]
    );
    return data;
}

exports.getallcomments = async(post_id) => {

    const [data, _] = await database.execute(
      `SELECT user_id,name,comment_id,comment,created_at from comments
       WHERE post_id=? ORDER BY created_at DESC`,
      [post_id]
    );
    return data;
}

exports.likepost = async(user_id,post_id,name) => {

    const data = await database.execute(
        `INSERT INTO likes(post_id,user_id) VALUES(?,?)`,
        [post_id, user_id, name]
      );
      return data;
}

exports.unlikepost = async(user_id,post_id) => {
    
    const data = await database.execute(
        `DELETE FROM likes WHERE post_id=? and user_id=?`,
        [post_id,user_id]
    );
    return data;
}

exports.listusersliked = async(post_id) => {
    const [data, _] = await database.execute(
        `SELECT user_id,name FROM likes WHERE post_id=?`,
        [post_id]
    );
    return data;
}
exports.deleteobject = async(url) =>{
    const data = await deleteobject(url);
    return data;
}