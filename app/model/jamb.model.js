module.exports = (sequelize, Sequelize) => {
   const jamb = sequelize.define('jamb', {
        session:{
           type : Sequelize.STRING,
           allowNull: false
        },
        description: {
           type: Sequelize.STRING,
           allowNull: true
        },
        active: {
           type: Sequelize.BOOLEAN,
           defaultValue: false
        }
    });
return jamb;
}