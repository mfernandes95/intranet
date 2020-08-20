module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('employeers', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      corporate_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        immutable: true,
      },
      fantasy_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      cnpj: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        immutable: true,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      zipcode: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      avatar: {
        type: Sequelize.STRING,
        // allowNull: false,
        unique: true,
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
    return queryInterface.dropTable('employeers');
  },
};
