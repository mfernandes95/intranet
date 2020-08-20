import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import EmployeeController from './app/controllers/EmployeeController';
import SessionEmployeeController from './app/controllers/SessionEmployeeController';
import SessionAdminController from './app/controllers/SessionAdminController';
import AdminController from './app/controllers/AdminController';
import EmployeerController from './app/controllers/EmployeerController';
import CompanyController from './app/controllers/CompanyController';
import SessionCompanyController from './app/controllers/SessionCompanyController';
import ProductController from './app/controllers/ProductController';
import OrderController from './app/controllers/OrderController';
import OrderControllerAll from './app/controllers/OrderControllerAll';

import authMiddleware from './app/middlewares/auth';
import PositionController from './app/controllers/PositionController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/employees/sessions', SessionEmployeeController.store); // login Employee
routes.post('/admins/sessions', SessionAdminController.store); // login Admin
routes.post('/companies/sessions', SessionCompanyController.store); // login company

routes.use(authMiddleware);

routes.post('/employees', upload.single('avatar'), EmployeeController.store); // Create employee
routes.get('/employees', EmployeeController.index); // Read empoyee
routes.put('/employees/:id', upload.single('avatar'), EmployeeController.update); // Update employee
routes.delete('/employees/:id', EmployeeController.destroy); // Delete employee

routes.post('/positions', PositionController.store);
routes.get('/positions', PositionController.index);
routes.put('/positions/:id', PositionController.update);
routes.delete('/positions/:id', PositionController.destroy);

routes.post('/employeers', upload.single('avatar'), EmployeerController.store); // Create employeer
routes.get('/employeers', EmployeerController.index); // Read employeer
routes.put('/employeers/:id', upload.single('avatar'), EmployeerController.update); // Update employeer
routes.delete('/employeers/:id', EmployeerController.destroy); // Remove employeer

routes.post('/products', upload.single('avatar'), ProductController.store); // Create Product
routes.get('/products', ProductController.index); // Read Product
routes.put('/products/:id', upload.single('avatar'), ProductController.update); // Update Product
routes.delete('/products/:id', ProductController.destroy); // Delete Product

routes.post('/companies', CompanyController.store); // create Company
routes.get('/companies', CompanyController.index); // index Company
routes.put('/companies/:id', CompanyController.update); // update Company
routes.delete('/companies/:id', CompanyController.destroy); // delete Company

routes.get('/admins', AdminController.index); // Read Admins
routes.put('/admins', AdminController.update); // update admin
routes.delete('/admins/:id', AdminController.destroy); // Delete admin

routes.post('/orders', OrderController.store); // Create Order
routes.put('/orders/:id', OrderController.update);
routes.get('/orders/:id', OrderController.index);
routes.get('/orders', OrderControllerAll.index); // List all orders
routes.delete('/orders/:id', OrderController.destroy);

export default routes;
