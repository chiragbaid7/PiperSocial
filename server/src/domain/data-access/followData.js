//const {Follow} = require('../models/index');

const database = require('../models/database');

exports.follow =  async(user_id,friend_user_id)=>{

    const data = await database.execute(
        `INSERT INTO followers(follower_id,following_id) VALUES(?,?)`,
        [user_id, friend_user_id]
    );
    return data;
}

exports.unfollow =  async(user_id,friend_user_id)=>{

    const data = await database.execute(
      `DELETE from followers WHERE follower_id=? and following_id=?`,
      [user_id, friend_user_id]
    );
    return data;
}

exports.getfriendlist = async(user_id)=>{
    const [data, _] = await database.execute(
      `SELECT follower_id as user_id, JSON_ARRAYAGG(following_id) as friends_id
      FROM followers WHERE follower_id=? GROUP BY follower_id`,
      [user_id]
    );
    return data;
}