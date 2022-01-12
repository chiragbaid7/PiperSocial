module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
    user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name : {
        type: DataTypes.STRING,
        allowNull: false
    },
    email : {
        type: DataTypes.STRING,
        allowNull: false
    },
    password : {
        type:DataTypes.STRING,
        allowNull:false
    }
}); 
    return User;
}
