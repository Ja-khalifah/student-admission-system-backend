module.exports = (sequelize, Sequelize) => {
    const Faculty = sequelize.define('faculty', {
        name :{
            type: Sequelize.STRING,
            allowNull: false,
            unique: true

        },
        detail:{
            type: Sequelize.STRING,
            allowNull: false
        }
    });
return Faculty;
}