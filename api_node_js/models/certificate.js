'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class certificate extends Model {
    /*
     * Helper method for defining associations.
     * This method is not a 
     * part of Sequelize lifecycle.
     * The `models/index` file will 
     * call this method automatically.
     */
    static associate(models) {
      // define association here
      models.certificate.belongsTo(models.user, 
        {foreignKey:"user_id"})
      //models.certificate.belongsTo(models.payment)
    }
  }
  certificate.init({
    subject_name: DataTypes.STRING,
    ca_name: DataTypes.STRING,
    version: DataTypes.STRING,
    serial_num: DataTypes.STRING,
    algo_sign: DataTypes.STRING,
    algo_hash: DataTypes.STRING,
    validity_begin: DataTypes.DATE,
    validity_end: DataTypes.DATE,
    public_key: DataTypes.STRING,
    private_key: DataTypes.STRING,
    type: DataTypes.STRING,
    parameter_pk: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    //payment_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'certificate'
  });
  return certificate;
};