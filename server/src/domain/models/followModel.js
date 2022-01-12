module.exports = (sequelize,DataTypes)=>{
    const Follow = sequelize.define('Follow', {
        follower_id:{
            type: DataTypes.UUID,
            primaryKey: true
        },
        following_id:{
            type: DataTypes.UUID,
            primaryKey: true
        }
    })
    // Helper method for associations.
    Follow.associate = function(models){
        Follow.belongsTo(
            models.User,
            {foreignKey: 'follower_id',onDelete:'CASCADE'}
        );
        Follow.belongsTo(
            models.User,
            {foreignKey: 'following_id',onDelete:'CASCADE'}
        );
    }
    return Follow;
}