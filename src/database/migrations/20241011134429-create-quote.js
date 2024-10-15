'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { StateNames, QuoteStates, Products } = require('../enums');
    await queryInterface.createTable('quotes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      status: {
        type: Sequelize.ENUM(QuoteStates),
        allowNull: false,
      },
      quote_date: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      quote_date_utc: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      street: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      street2: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      state: {
        type: Sequelize.ENUM(StateNames),
        allowNull: true,
      },
      zip_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      effective_date: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      effective_date_utc: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      bound_date: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bound_date_utc: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      insured_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'insureds',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      bound: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      quote_number_inc: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      quote_number: {
        type: Sequelize.STRING,
        unique: true,
      },
      carrier: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      meta_data: {
        type: Sequelize.JSONB,
        defaultValue: {},
      },
      documents: {
        type: Sequelize.JSONB,
        defaultValue: {},
      },
      data: {
        type: Sequelize.JSONB,
        defaultValue: {},
      },
      product: {
        type: Sequelize.ENUM(Products),
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addIndex('quotes', ['quote_number']);
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('quotes');
    const enumTypes = [
      'enum_quotes_county_fips',
      'enum_quotes_state',
      'enum_quotes_status',
      'enum_quotes_product',
    ];
    enumTypes.forEach(async (type) => {
      await queryInterface.sequelize.query(`DROP TYPE IF EXISTS "${type}"`);
    });
  },
};
