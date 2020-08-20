import Sequelize, { Model } from 'sequelize';

// dice of employees insert for create
class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        comments: Sequelize.STRING,
        total_price: Sequelize.DOUBLE,
        discount: Sequelize.DOUBLE,
        order_accepted: Sequelize.BOOLEAN,
        order_done: Sequelize.BOOLEAN,
        status: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  // associate 1:1 1:N N:N
  static associate(models) {
    this.belongsTo(models.Employee, { foreignKey: 'employee_id' });
    this.belongsTo(models.Company, { foreignKey: 'company_id' });
    this.belongsToMany(models.Product, {
      foreignKey: 'order_id',
      through: 'order_products',
    });
  }
}

export default Order;
