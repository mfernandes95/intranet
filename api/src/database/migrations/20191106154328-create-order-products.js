module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('order_products', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      order_id: {
        type: Sequelize.INTEGER,
        // allowNull: false,
        references: {
          model: 'orders',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      product_id: {
        type: Sequelize.INTEGER,
        // allowNull: false,
        references: {
          model: 'products',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('order_products');
  },
};
