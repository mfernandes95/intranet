import Sequelize, { Model } from 'sequelize';

// dice of employees insert for create
class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        product_name: Sequelize.STRING,
        fantasy_name: Sequelize.STRING,
        price: Sequelize.DOUBLE,
        quantity: Sequelize.INTEGER,
        description: Sequelize.STRING,
        avatar: Sequelize.STRING,
        status: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  // associate 1:1 1:N N:N
  static associate(models) {
    this.belongsToMany(models.Order, {
      foreignKey: 'product_id',
      through: 'order_products',
    });
  }
}

export default Product;
