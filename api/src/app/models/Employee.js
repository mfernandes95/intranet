import Sequelize, {
  Model
} from 'sequelize';
import bcrypt from 'bcryptjs';

// dice of employees insert for create
class Employee extends Model {
  static init(sequelize) {
    super.init({
      username: Sequelize.STRING,
      first_name: Sequelize.STRING,
      last_name: Sequelize.STRING,
      email: Sequelize.STRING,
      age: Sequelize.INTEGER,
      date_birth: Sequelize.DATE,
      balance: Sequelize.DOUBLE,
      avatar: Sequelize.STRING,
      status: Sequelize.BOOLEAN,
      password: Sequelize.VIRTUAL,
      password_hash: Sequelize.STRING,
    }, {
      sequelize,
    });
    // encrypt password of employee
    this.addHook('beforeSave', async employee => {
      if (employee.password) {
        employee.password_hash = await bcrypt.hash(employee.password, 8);
      }
    });
    return this;
  }

  // associate 1: 1 1: N N: N
  static associate(models) {
    this.belongsTo(models.Employeer, {
      foreignKey: 'employeer_id'
    });
    this.belongsTo(models.Position, {
      foreignKey: 'position_id'
    });
    this.hasMany(models.Order, {
      foreignKey: 'employee_id'
    });
    this.hasMany(models.Admin, {
      foreignKey: 'employee_id'
    });
    this.hasMany(models.Company, {
      foreignKey: 'employee_id'
    });
  }

  // compare employee password with is password of database.
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default Employee;
