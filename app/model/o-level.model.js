module.exports = (sequelize, Sequelize) => {
    const OLevelResult = sequelize.define('o_level', {
        registringNo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        sitting:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        grade: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
    return OLevelResult;
}