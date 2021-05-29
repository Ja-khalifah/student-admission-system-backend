module.exports = (sequelize, Sequelize) => {
    const JambResult = sequelize.define('jamb', {
         score: {
            type: Sequelize.INTEGER,
            allowNull: false
         }
     });
 return JambResult;
 }