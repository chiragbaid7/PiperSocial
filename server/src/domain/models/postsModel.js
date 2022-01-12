module.exports = (sequelize,DataTypes)=>{
    const Post =  sequelize.define('Post', {
        post_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        user_id : {
            type: DataTypes.UUID
        },
        post: {
            type: DataTypes.STRING, // Todo: type Blob for images, videos, gifs, etc.
            allowNull: false
        } 
    })
    // Add a function to define association.
    Post.associate = function(models) {
        // many to one mapping.
        Post.belongsTo(models.User, {foreignKey: 'user_id', onDelete:'CASCADE'})
    }
    return Post;
}
