import * as Yup from 'yup';
import Employeer from '../models/Employeer';
import Admin from '../models/Admin';
import Employee from '../models/Employee';

class EmployeerController {
  async store(req, res) {
    const schema = Yup.object().shape({
      corporate_name: Yup.string().required(),
      fantasy_name: Yup.string().required(),
      address: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      zipcode: Yup.string().required(),
      cnpj: Yup.string()
        .required()
        .min(14)
        .max(14),
      // avatar: Yup.file().required(),
    });

    // If schema invalid
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails.',
      });
    }

    const isAdmin = await Admin.findOne({
      where: {
        employee_id: req.activeUserId,
      },
    });

    if (!isAdmin) {
      return res.status(400).json({
        error: 'You are not admin',
      });
    }
    const employeerExists = await Employeer.findOne({
      where: {
        cnpj: req.body.cnpj,
      },
    });

    if (employeerExists) {
      return res.status(400).json({
        error: 'employeer already exists.',
      });
    }

    const { filename } = req.file;

    const {
      id,
      corporate_name,
      fantasy_name,
      email,
      address,
      zipcode,
      cnpj,
    } = req.body;

    try {
      const employeer = await Employeer.create({
        id,
        corporate_name,
        fantasy_name,
        email,
        address,
        zipcode,
        cnpj,
        avatar: filename,
      });

      return res.json({
        employeer,
      });
    } catch (err) {
      return res.status(500).json({
        err: 'Employeer create failed!',
      });
    }
  }

  // Update Employeer
  async update(req, res) {
    const schema = Yup.object().shape({
      corporate_name: Yup.string(),
      fantasy_name: Yup.string(),
      email: Yup.string().email(),
      address: Yup.string(),
      zipcode: Yup.string(),
      cnpj: Yup.string()
        .min(14)
        .max(14),
    });
    // If schema invalid
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails.',
      });
    }

    const { id } = req.params;

    const { filename } = req.file;

    const {
      corporate_name,
      cnpj,
      fantasy_name,
      email,
      address,
      zipcode,
    } = req.body;

    const isAdmin = await Admin.findOne({
      where: {
        employee_id: req.activeUserId,
      },
    });

    if (!isAdmin) {
      return res.status(400).json({
        error: 'You are not admin',
      });
    }

    if (!id) {
      return res.status(400).json({
        error: 'Employeer does not exist',
      });
    }
    const employeer = await Employeer.findByPk(id);

    if (!!corporate_name && corporate_name !== employeer.corporate_name) {
      const employeerExists = await Employeer.findOne({
        where: {
          corporate_name,
        },
      });

      if (!employeerExists) {
        return res.status(400).json({
          error: 'cannot change the name',
        });
      }
    }

    if (!!email && email !== employeer.email) {
      return res.status(401).json({
        error: 'email already exist',
      });
    }
    // If dont can put cnpj
    if (!!cnpj && cnpj !== employeer.cnpj) {
      const employeerExists = await Employeer.findOne({
        where: {
          cnpj,
        },
      });
      if (!employeerExists) {
        return res.status(400).json({
          error: 'cannot change the cnpj',
        });
      }
    }

    try {

      const employeer = await Employeer.findOne({ where: { id: req.activeUserId } });

      await employeer.update(req.body);

      return res.json({
        id,
        corporate_name,
        fantasy_name,
        avatar: filename,
        email,
        address,
        zipcode,
        cnpj,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        err: 'Employeer update failed!',
      });
    }
  }

  // list employess
  async index(req, res) {
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

    if (!(isAdmin || isEmployee)) {
      return res.status(400).json({
        error: 'cannot list all employeers',
      });
    }

    try {
      const employeer = await Employeer.findAll({
        attributes: [
          'id',
          'corporate_name',
          'fantasy_name',
          'email',
          'address',
          'zipcode',
          'cnpj',
          'avatar',
        ],
      });

      return res.status(200).json(employeer);
    } catch (err) {
      return res.status(500).json({
        err: 'Employeer list failed!',
      });
    }
  }

  // remove employeers
  async destroy(req, res) {
    const { id } = req.params;

    const isAdmin = await Admin.findOne({
      where: {
        employee_id: req.activeUserId,
      },
    });

    const employeer = await Employeer.findByPk(id);

    if (!isAdmin) {
      return res.status(400).json({
        error: 'You are not admin',
      });
    }

    if (!employeer) {
      return res.status(400).json({
        error: 'This employeer does not exists',
      });
    }

    try {
      await Employeer.destroy({
        where: {
          id,
        },
      });

      return res.status(200).json({
        message: 'Employeer deleted',
      });
    } catch (err) {
      return res.status(500).json({
        err: 'Employeer delete failed!',
      });
    }
  }
}

export default new EmployeerController();
