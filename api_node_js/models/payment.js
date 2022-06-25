'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.payment.belongsTo(models.transaction)
      //models.payment.hasOne(models.certificate)
    }
  }
  payment.init({
    amount: DataTypes.STRING,
    transaction_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'payment', underscored: false
  });
  return payment;
};