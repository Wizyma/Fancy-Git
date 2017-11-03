module.exports = function (sequelize, Sequelize) {

  const Link = sequelize.define('Link', {

    Link_ID: {
      autoIncrement:true,
      primaryKey: true,
      type: Sequelize.BIGINT,
    },

    Link_url: {
      type: Sequelize.STRING,
      notEmpty: true,
    },

    Link_description: {
      type: Sequelize.STRING,
      notEmpty: true,
    },

  })
  return Link
}
