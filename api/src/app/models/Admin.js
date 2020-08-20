import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

// dice of employees insert for create
class Admin extends Model {
  static init(sequelize) {
    super.init(
      {
        username: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    // encrypt password of admin
    this.addHook('beforeSave', async admin => {
      if (admin.password) {
        admin.password_hash = await bcrypt.hash(admin.password, 8);
      }
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Employee, {
      foreignKey: 'employee_id',
    });
    this.belongsTo(models.Company, {
      foreignKey: 'company_id',
    });
  }

  // compare admin password with the password of database.
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default Admin;
