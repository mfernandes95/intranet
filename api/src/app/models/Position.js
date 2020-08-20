import Sequelize, { Model } from 'sequelize';

class Position extends Model {
  static init(sequelize) {
    super.init(
      {
        position: Sequelize.STRING,
        level: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  // associate 1: 1 1: N N: N
  static associate(models) {
    this.hasMany(models.Employee, { foreignKey: 'position_id' });
  }
}

export default Position;
