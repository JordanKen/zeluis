'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('certificates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      subject_name: {
        type: Sequelize.STRING
      },
      ca_name: {
        type: Sequelize.STRING
      },
      version: {
        type: Sequelize.STRING
      },
      serial_num: {
        type: Sequelize.STRING
      },
      algo_sign: {
        type: Sequelize.STRING
      },
      algo_hash: {
        type: Sequelize.STRING
      },
      validity_begin: {
        type: Sequelize.DATE
      },
      validity_end: {
        type: Sequelize.DATE
      },
      public_key: {
        type: Sequelize.STRING
      },
      private_key: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      parameter_pk: {
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model:'users',
          key:'id'
        }
      },
      /*payment_id: {
        type: Sequelize.INTEGER,
        references: {
          model:'payments',
          key:'id'
        }
      },*/
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('certificates');
  }
};