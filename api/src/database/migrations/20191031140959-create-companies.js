module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('companies', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      company_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
      },
      password_hash: {
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
        onDelete: 'SET NULL',
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
    return queryInterface.dropTable('companies');
  },
};
