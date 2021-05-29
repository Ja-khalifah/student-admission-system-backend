module.exports = (sequelize, Sequelize) => {
    const Institution = sequelize.define('institution', {
        name :{
            type: Sequelize.STRING,
            allowNull: false,
            unique: true

        },
        type:{
            type: Sequelize.STRING,
            allowNull: false
        },
        location:{
            type: Sequelize.STRING,
            allowNull: false
        }
    });
return Institution;
}