module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Favorites", {
    UserID: {
      type: DataTypes.STRING,
      notEmpty: true,
    },

    RepoName: {
      type: DataTypes.STRING,
      notEmpty: true,
    },

    RepoUser: {
      type: DataTypes.STRING,
      notEmpty: true,
    },
  }, { 
    timestamps: false,
    
  })
}