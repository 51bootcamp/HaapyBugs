module.exports = (sequelize, DataTypes) => {
  return sequelize.define('testing', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey : true,
      autoIncrement : true,
      allowNull : false,
    },
    email: {
      type: DataTypes.STRING(255),
      unique : true,
      allowNull : true,
      validate : {
        isEmail : {msg : "it's not email"},
      }
    },
    password : {
      type : DataTypes.STRING(30)
    }
  });
};
