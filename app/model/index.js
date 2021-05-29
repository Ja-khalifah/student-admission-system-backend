const config = require('../config/db.config');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorAliases: false,

        pool:{
            max: config.pool.max,
            idle: config.pool.idle,
            acquire: config.pool.acquire,
            min: config.pool.min
        }
    }
);

const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user.model')(sequelize,Sequelize);
db.role = require('./role.model')(sequelize,Sequelize);
db.jamb = require('./jamb.model')(sequelize,Sequelize);
db.jambResult = require('./jambResult.model')(sequelize,Sequelize);
db.institution = require('./institution.model')(sequelize,Sequelize);
db.institutionCategory = require('./institutionCategory.model')(sequelize,Sequelize);
db.o_level = require('./o-level.model')(sequelize,Sequelize);
db.subject = require('./subject.model')(sequelize,Sequelize);
db.faculty = require('./faculty.model')(sequelize,Sequelize);
db.department = require('./department.model')(sequelize,Sequelize);


/*many to many relationship btw users and roles 
1. users
2. roles
3. user_roles
*/
db.role.belongsToMany(db.user, {
    through: 'user_roles',
    foreignKey: 'roleId',
    otherKey: 'userId'
});
db.user.belongsToMany(db.role, {
    through: 'user_roles',
    foreignKey: 'userId',
    otherKey: 'roleId'
});


/*one to many relationship btw user and olevel
i.e a user has many o_level*/

db.user.hasMany(db.o_level);


/*one to many relationship btw subject and olevel
i.e a subject has many o_level*/

db.subject.hasMany(db.o_level);

/*one to many relationship btw subject and jamb
i.e a subject has many jamb*/

db.subject.hasMany(db.jamb);

/*one to many relationship btw user and jamb reult
i.e a user has many jamb*/

db.user.hasMany(db.jambResult);
db.subject.hasMany(db.jambResult);
db.jamb.hasMany(db.jambResult);

/*one to many relationship btw user and institution
i.e a user has many institutions*/

db.institutionCategory.hasMany(db.institution);

/*one to many relationship btw faculty and department
i.e a user has many institutions*/

db.faculty.hasMany(db.department);

/*one to many relationship btw institution and department
i.e a user has many institutions*/

db.institution.hasMany(db.department);

/*many to many relationship btw users and institution 
1. users
2. institution
3. user_institution
*/
db.institution.belongsToMany(db.user, {
    through: 'user_institution',
    foreignKey: 'institutionId',
    otherKey: 'userId'
});
db.user.belongsToMany(db.role, {
    through: 'user_institution',
    foreignKey: 'userId',
    otherKey: 'institutionId'
});

/*many to many relationship btw users and department 
1. users
2. department
3. user_department
*/
db.department.belongsToMany(db.user, {
    through: 'user_department',
    foreignKey: 'departmentId',
    otherKey: 'userId'
});
db.user.belongsToMany(db.role, {
    through: 'user_department',
    foreignKey: 'userId',
    otherKey: 'departmentId'
});


/*many to many relationship btw subject and department 
1. subject
2. department
3. department_olevel_subject
*/
db.department.belongsToMany(db.subject, {
    through: 'department_olevel_subject',
    foreignKey: 'departmentId',
    otherKey: 'subjectId'
});
db.subject.belongsToMany(db.department, {
    through: 'department_olevel_subject',
    foreignKey: 'subjectId',
    otherKey: 'departmentId'
});

/*many to many relationship btw subject and department 
1. subject
2. department
3. department_jamb_subject
*/
db.department.belongsToMany(db.subject, {
    through: 'department_jamb_subject',
    foreignKey: 'departmentId',
    otherKey: 'subjectId'
});
db.subject.belongsToMany(db.department, {
    through: 'department_jamb_subject',
    foreignKey: 'subjectId',
    otherKey: 'departmentId'
});

db.ROLES = ['student', 'admin'];

module.exports = db;


