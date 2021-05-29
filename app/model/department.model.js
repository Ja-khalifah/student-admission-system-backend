module.exports = (sequelize, Sequelize) => {
    const Department = sequelize.define('department', {
        name :{
            type: Sequelize.STRING,
            allowNull: false,
            unique: true

        },
        jambScoreRequirement: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        detail:{
            type: Sequelize.STRING,
            allowNull: false
        }
    });
return Department;
}