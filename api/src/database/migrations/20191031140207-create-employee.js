module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('employees', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      age: {
        type: Sequelize.INTEGER,
      },
      date_birth: {
        type: Sequelize.DATE,
      },
      balance: {
        type: Sequelize.DOUBLE,
      },
      avatar: {
        type: Sequelize.STRING,
        unique: true,
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.BOOLEAN,
        // allowNull: false,
        default: true,
      },
      position_id: {
        type: Sequelize.INTEGER,
        // allowNull: false,
        references: {
          model: 'positions',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      employeer_id: {
        type: Sequelize.INTEGER,
        // allowNull: false,
        references: {
          model: 'employeers',
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
    return queryInterface.dropTable('employees');
  },
};
