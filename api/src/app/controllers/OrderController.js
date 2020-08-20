import * as Yup from 'yup';
import Order from '../models/Order';
import Product from '../models/Product';
import Employee from '../models/Employee';
import Company from '../models/Company';
import Admin from '../models/Admin';

// import OrderProduct from '../models/OrderProduct';

class OrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      comments: Yup.string(),
      total_price: Yup.number().required(),
      discount: Yup.number(),
      order_accepted: Yup.boolean().required(),
      status: Yup.string().required(),
      order_done: Yup.boolean().required(),
      employee_id: Yup.number().required(),
      company_id: Yup.number().required(),
      // product_id: Yup.number().required(),
    });
    // If schema invalid
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails.',
      });
    }
    const { products, ...data } = req.body;

    const isAdmin = await Admin.findOne({
      where: { employee_id: req.activeUserId },
    });

    const ProductExist = await Product.findOne({
      where: { id: req.activeUserId },
    });

    if (isAdmin) {
      return res
        .status(401)
        .json({ error: 'You are admin, cannot create orders' });
    }

    if (!ProductExist) {
      return res.status(401).json({ error: 'This product does not exists' });
    }

    try {
      const createOrder = await Order.create(data);
      if (products && products.length === 0) {
        return res.status(400).json({
          err: 'Insert some product to generate the order',
        });
      }
      if (products && products.length > 0) {
        createOrder.setProducts(products);
      }
      return res.status(200).json(createOrder);
    } catch (err) {
      if (err.parent.code === '23503') {
        return res.status(400).json({
          err: 'Foreignkey not exists!',
        });
      }
      return res.status(500).json({
        err: 'Order create failed!',
      });
    }
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      comments: Yup.string(),
      total_price: Yup.number().required(),
      discount: Yup.number(),
      order_accepted: Yup.boolean().required(),
      status: Yup.string().required(),
      order_done: Yup.boolean().required(),
      employee_id: Yup.number().required(),
      company_id: Yup.number().required(),
      product_id: Yup.number().required(),
    });

    // If schema invalid
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails.',
      });
    }

    const { id } = req.params;

    const {
      comments,
      total_price,
      discount,
      order_accepted,
      status,
      order_done,
      employee_id,
      company_id,
    } = req.body;

    const isCompany = await Company.findOne({
      where: {
        id: req.activeUserId,
      },
    });
    const isEmployee = await Employee.findOne({
      where: {
        id: req.activeUserId,
      },
    });

    const isAdmin = await Admin.findOne({
      where: {
        employee_id: req.activeUserId,
      },
    });

    const orderExists = await Order.findOne({
      where: { id: req.activeUserId },
    });

    if (isAdmin) {
      return res.status(401).json({
        error: 'Cannot update this order',
      });
    }

    if (!(isEmployee || isCompany)) {
      return res.status(400).json({
        error: 'Cannot update this order',
      });
    }

    if (!orderExists) {
      return res.status(400).json({
        error: 'This order does not exists',
      });
    }

    try {
      const orderUser = await Order.findByPk(id);

      await orderUser.update(req.body);

      return res.json({
        id,
        comments,
        total_price,
        discount,
        order_accepted,
        status,
        order_done,
        employee_id,
        company_id,
      });
    } catch (err) {
      if (err.parent.code === '23503') {
        return res.status(400).json({
          err: 'Foreignkey not exists!',
        });
      }

      return res.status(500).json({
        err: 'Order update failed!',
      });
    }
  }

  // list employess
  async index(req, res) {
    const { id } = req.params;

    const isCompany = await Company.findOne({
      where: {
        id: req.activeUserId,
      },
    });
    const isEmployee = await Employee.findOne({
      where: {
        id: req.activeUserId,
      },
    });
    const isAdmin = await Admin.findOne({
      where: {
        employee_id: req.activeUserId,
      },
    });

    if (!isAdmin) {
      return res.status(400).json({
        error: 'Cannot list all orders',
      });
    }

    if (!(isCompany || isEmployee)) {
      return res.status(400).json({
        error: 'Cannot list all orders',
      });
    }

    try {
      const order = await Order.findAll({
        where: {
          employee_id: req.params.id,
        },
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

  // destroy employees
  async destroy(req, res) {
    const { id } = req.params;

    const isCompany = await Company.findOne({
      where: {
        id: req.activeUserId,
      },
    });
    const isEmployee = await Company.findOne({
      where: {
        id: req.activeUserId,
      },
    });
    const orderExists = await Order.findByPk(id);

    const isAdmin = await Admin.findOne({
      where: {
        employee_id: req.activeUserId,
      },
    });

    if (isAdmin) {
      res.status(400).json({
        error: 'Cannot destroy this orders',
      });
    }

    if (!(isCompany || isEmployee)) {
      return res.status(400).json({
        error: 'Cannot destroy this order',
      });
    }

    if (!orderExists) {
      return res.status(400).json({
        error: 'This order does not exists',
      });
    }

    try {
      await Order.destroy({
        where: {
          id,
        },
      });

      return res.status(200).json({
        message: 'Order deleted',
      });
    } catch (err) {
      if (err.parent.code === '23503') {
        return res.status(400).json({
          err: 'Dont can delete order, put status to cancelled',
        });
      }

      return res.status(500).json({
        err: 'Order delete failed!',
      });
    }
  }
}

export default new OrderController();
