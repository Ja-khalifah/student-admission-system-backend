module.exports = (sequelize, Sequelize) => {
    const InstitutionCategory = sequelize.define('institution_category', {
        name :{
            type: Sequelize.STRING,
            allowNull: false,
            unique: true

        },
        description:{
            type: Sequelize.STRING,
            allowNull: true
        }
    });
return InstitutionCategory;
}