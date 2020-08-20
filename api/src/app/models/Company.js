import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

// dice of employees insert for create
class Company extends Model {
  static init(sequelize) {
    super.init(
      {
        username: Sequelize.STRING,
        company_name: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    // encrypt password of company
    this.addHook('beforeSave', async company => {
      if (company.password) {
        company.password_hash = await bcrypt.hash(company.password, 8);
      }
    });
    return this;
  }

  // associate 1: 1 1: N N: N
  static associate(models) {
    this.belongsTo(models.Employee, { foreignKey: 'employee_id' });
    this.hasMany(models.Admin, { foreignKey: 'company_id' });
    this.hasMany(models.Order, { foreignKey: 'company_id' });
  }

  // compare company password with is password of database.
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default Company;
