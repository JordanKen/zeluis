'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.transaction.belongsTo(models.user)
      models.transaction.hasOne(models.payment_method)
    }
  }
  transaction.init({
    amount: DataTypes.INTEGER,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    payment_method_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};