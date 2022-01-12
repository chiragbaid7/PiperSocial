//const {User ,Sequelize} = require('../models/index');

const database = require('../models/database');

exports.createUser = async(name, email, password) =>{
    const [data, _] = await database.execute(
        `insert into users (email,name,password) values (?,?,?)`,
        [email, name, password]
    );
    return {user_id:data.insertId};
}

exports.findUser = async(email, password)=>{
    const [data, _] = await database.execute(
      "SELECT user_id,name from users WHERE email=? and password=?",
      [email, password]
    );
    return data;
}

exports.findbyEmailorId = async(userdata)=>{
    /*
    const user = await User.findAll({
        where:{
         [Sequelize.Op.or]: [{email: userdata}, {user_id: userdata}] 
        }
    })
    return user;
    */
    const [data, _] = await database.execute(
      "SELECT name from users WHERE email=? or user_id=?",
      [userdata, userdata]
    );
    return data;
} 