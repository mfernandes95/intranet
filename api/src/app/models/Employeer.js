import Sequelize, { Model } from 'sequelize';

class Employeer extends Model {
  static init(sequelize) {
    super.init(
      {
        corporate_name: Sequelize.STRING,
        fantasy_name: Sequelize.STRING,
        email: Sequelize.STRING,
        address: Sequelize.STRING,
        zipcode: Sequelize.STRING,
        cnpj: Sequelize.STRING,
        avatar: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  // associate 1: 1 1: N N: N
  static associate(models) {
    this.hasMany(models.Employee, { foreignKey: 'employeer_id' });
  }
}

export default Employeer;
