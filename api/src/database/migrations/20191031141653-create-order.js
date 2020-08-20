module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('orders', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      comments: {
        type: Sequelize.STRING,
      },
      total_price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      discount: {
        type: Sequelize.DOUBLE,
      },
      order_accepted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false,
      },
      order_done: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      employee_id: {
        type: Sequelize.INTEGER,
        // allowNull: false,
        references: {
          model: 'employees',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      company_id: {
        type: Sequelize.INTEGER,
        // allowNull: false,
        references: {
          model: 'companies',
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
    return queryInterface.dropTable('orders');
  },
};
