import Sequelize from 'sequelize';

import Employee from '../app/models/Employee';
import Employeer from '../app/models/Employeer';
import Admin from '../app/models/Admin';
import Company from '../app/models/Company';
import Position from '../app/models/Position';
import Product from '../app/models/Product';
import Order from '../app/models/Order';

import databaseConfig from '../config/database';

const models = [Employee, Employeer, Admin, Company, Position, Product, Order];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
