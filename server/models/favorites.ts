import { SequelizeStaticAndInstance, Sequelize, DefineAttributes } from 'sequelize'

module.exports = (sequelize: Sequelize|any, DataTypes: DefineAttributes) => {
  return sequelize.define('Favorites', {
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
