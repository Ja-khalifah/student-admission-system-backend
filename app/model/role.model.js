module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define('role' , {
        // id: {
        //     type: Sequelize.INTEGER,
        //     PrimaryKey: true
        // },
        name:{
            type: Sequelize.STRING,
        }
    });
return Role;
}