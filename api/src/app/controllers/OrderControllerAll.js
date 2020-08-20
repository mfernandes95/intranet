// import * as Yup from 'yup';
import Admin from '../models/Admin';
import Employee from '../models/Employee';
import Order from '../models/Order';
import Company from '../models/Company';
import Product from '../models/Product';

class OrderControllerAll {
  async index(req, res) {
    const isAdmin = await Admin.findOne({
      where: { employee_id: req.activeUserId },
    });

    const isEmployee = await Employee.findOne({
      where: { id: req.activeUserId },
    });

    const isCompany = await Company.findOne({
      where: { id: req.activeUserId },
    });

    if (!(isEmployee && isCompany)) {
      return res.status(401).json({ error: 'Cannot list all orders' });
    }

    if (isAdmin) {
      return res
        .status(401)
        .json({ error: 'You are admin, cannot list all orders' });
    }
    try {
      const order = await Order.findAll({
        attributes: [
          'id',
          'comments',
          'total_price',
          'discount',
          'order_accepted',
          'order_done',
          'status',
          'employee_id',
          'company_id',
        ],
        include: [
          {
            model: Product,
            through: {
              attributes: [],
            },
          },
        ],
      });

      return res.status(200).json(order);
    } catch (err) {
      return res.status(500).json({
        err: 'Order list failed!',
      });
    }
  }
}

export default new OrderControllerAll();
