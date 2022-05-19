'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class payment_method extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.payment_method.hasMany(models.transaction)
    }
  }
  payment_method.init({
    name_pm: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'payment_method',
  });
  return payment_method;
};