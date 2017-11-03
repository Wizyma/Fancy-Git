module.exports = function (sequelize, Sequelize) {

  
  const Profile = Sequelize.define('Userprofile', {
    
    User_ID: {
      autoIncrement:true,
      primaryKey: true,
      type: Sequelize.BIGINT,
    },
    
    Name: {
      type: Sequelize.STRING,
      notEmpty: true,
    },
    
    Firstname: {
      type: Sequelize.STRING,
      notEmpty: true,
    },
    
    Username: {
      type: Sequelize.STRING,
      notEmpty: true,
    },
    
    Email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true,
      },
    },
    
    Password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    
  })
  return Profile 
}
