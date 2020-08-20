import * as Yup from 'yup';
import Product from '../models/Product';
import Company from '../models/Company';
import Employee from '../models/Employee';
import Admin from '../models/Admin';

class ProductController {
  async store(req, res) {
    const schema = Yup.object().shape({
      product_name: Yup.string().required(),
      fantasy_name: Yup.string().required(),
      price: Yup.number().required(),
      quantity: Yup.number().required(),
      description: Yup.string().required(),
      // avatar: Yup.object().required(),
      status: Yup.boolean().required(),
    });

    // If schema invalid
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails.',
      });
    }

    const isCompany = await Company.findOne({
      where: {
        id: req.activeUserId,
      },
    });
    const isAdmin = await Admin.findOne({
      where: {
        employee_id: req.activeUserId,
      },
    });

    if (isAdmin) {
      return res.status(400).json({
        error: 'Cannot create products',
      });
    }

    if (!isCompany) {
      return res.status(400).json({
        error: 'Cannot create products',
      });
    }
    const productExists = await Product.findOne({
      where: {
        product_name: req.body.product_name,
      },
    });

    // If case product exists don´t create new
    if (productExists) {
      return res.status(400).json({
        error: 'product already exists.',
      });
    }

    const { filename } = req.file;

    const {
      product_name,
      fantasy_name,
      price,
      quantity,
      description,
      status,
    } = req.body;

    try {
      const product = await Product.create({
        product_name,
        fantasy_name,
        price,
        quantity,
        description,
        avatar: filename,
        status,
      });

      return res.status(200).json({
        product,
      });
    } catch (err) {
      return res.status(500).json({
        err: 'Product create failed!',
      });
    }
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      product_name: Yup.string(),
      fantasy_name: Yup.string(),
      price: Yup.number(),
      quantity: Yup.number(),
      description: Yup.string(),
      avatar: Yup.string(),
    });

    // If schema invalid
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails.',
      });
    }

    const isCompany = await Company.findOne({
      where: {
        id: req.activeUserId,
      },
    });

    const isAdmin = await Admin.findOne({
      where: {
        employee_id: req.activeUserId,
      },
    });

    if (isAdmin) {
      return res.status(400).json({
        error: 'Cannot update products',
      });
    }

    if (!isCompany) {
      return res.status(400).json({
        error: 'Cannot update products',
      });
    }

    const { id } = req.params;

    const productExist = await Product.findByPk(id);

    if (!productExist) {
      return res.status(401).json({ error: 'Product does not exist' });
    }

    const { filename } = req.file;

    const {
      product_name,
      fantasy_name,
      price,
      quantity,
      description,
      status,
    } = req.body;

    if (!!price && price !== productExist.price) {
      return res.status(401).json({ error: 'Cannot update this price' });
    }

    if (!!product_name && product_name !== productExist.product_name) {
      return res.status(401).json({ error: 'Cannot update this product_name' });
    }

    try {
      const product = await Product.findByPk(id);

      await product.update(req.body);

      return res.status(200).json({
        id,
        product_name,
        fantasy_name,
        price,
        quantity,
        description,
        status,
        avatar: filename,
      });
    } catch (err) {
      return res.status(500).json({
        err: 'Product update failed!',
      });
    }
  }

  // list products
  async index(req, res) {
    const isEmployee = await Employee.findOne({
      where: {
        id: req.activeUserId,
      },
    });
    const isCompany = await Company.findOne({
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
        error: 'Cannot list all Productss',
      });
    }

    if (!(isEmployee || isCompany)) {
      return res.status(400).json({
        error: 'Cannot list all Products',
      });
    }

    try {
      const product = await Product.findAll({
        attributes: [
          'id',
          'product_name',
          'fantasy_name',
          'price',
          'quantity',
          'description',
          'avatar',
          'status',
        ],
      });

      return res.status(200).json(product);
    } catch (err) {
      return res.status(500).json({
        err: 'Position list failed!',
      });
    }
  }

  // destroy products
  async destroy(req, res) {
    const { id } = req.params;

    const isCompany = await Company.findOne({
      where: { id: req.activeUserId },
    });
    const product = await Product.findByPk(id);
    const isAdmin = await Admin.findOne({
      where: { employee_id: req.activeUserId },
    });

    if (isAdmin) {
      return res.status(400).json({ error: 'Cannot destroy this product' });
    }

    if (!isCompany) {
      return res.status(400).json({ error: 'Cannot destroy this product' });
    }

    if (!product) {
      return res.status(400).json({ error: 'This product does not exists' });
    }
    try {
      await Product.destroy({ where: { id } });

      return res.status(200).json({ message: 'product deleted' });
    } catch (err) {
      if (err.parent.code === '23503') {
        return res.status(400).json({
          err: 'Dont can delete product, put status to disabled',
        });
      }

      return res.status(500).json({
        err: 'Product delete failed!',
      });
    }
  }
}

export default new ProductController();
