import * as Yup from 'yup';
import Company from '../models/Company';
import Admin from '../models/Admin';

class CompanyController {
  async store(req, res) {
    const schema = Yup.object().shape({
      username: Yup.string().required(),
      company_name: Yup.string().required(),
      // employee_id: Yup.number().required(),
      password: Yup.string()
        .required()
        .min(6),
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
        error: 'cannot create company',
      });
    }

    const companyExists = await Company.findOne({
      where: {
        username: req.body.username,
      },
    });

    // If case company exists don´t create new
    if (companyExists) {
      return res.status(400).json({
        error: 'company already exists.',
      });
    }

    const { id, username, company_name, password, employee_id } = req.body;

    if (!employee_id) {
      return res.status(400).json({
        error: 'Employee not exists.',
      });
    }

    try {
      const company = await Company.create({
        id,
        username,
        company_name,
        employee_id,
        password,
      });

      return res.status(200).json({
        company,
      });
    } catch (err) {
      if (err.parent.code === '23503') {
        return res.status(400).json({
          err: 'Foreignkey not exists!',
        });
      }

      return res.status(500).json({
        err: 'Create company failed!',
      });
    }
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      username: Yup.string(),
      company_name: Yup.string(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    // If schema invalid
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails.',
      });
    }

    const activeCompany = await Company.findByPk(req.activeUserId);
    const isAdmin = await Admin.findOne({
      where: {
        company_id: req.activeUserId,
      },
    });

    const { id } = req.params;
    const companyExist = await Company.findByPk(id);

    if (!companyExist) {
      return res.json({
        error: 'company does not exist',
      });
    }

    if (id !== activeCompany.id && !isAdmin) {
      return res.status(401).json({
        error: 'cannot update company',
      });
    }

    const { company_name, username, oldPassword, employee_id } = req.body;

    if (!!company_name && company_name !== activeCompany.company_name) {
      return res.status(400).json({
        error: "if don't cant put username ",
      });
    }

    if (!!username && username !== activeCompany.username) {
      return res.status(400).json({
        error: "if don't cant put username",
      });
    }

    // If fot put password need input a password
    if (oldPassword && !(await activeCompany.checkPassword(oldPassword))) {
      return res.status(401).json({
        error: 'Password does not match',
      });
    }

    if (!employee_id) {
      return res.status(400).json({
        error: 'Employee not exists.',
      });
    }

    try {
      const company = await Company.findByPk(id);

      await company.update(req.body);

      return res.status(200).json({
        id,
        username,
        company_name,
        employee_id,
      });
    } catch (err) {
      if (err.parent.code === '23503') {
        return res.status(400).json({
          err: 'Foreignkey not exists!',
        });
      }

      return res.status(500).json({
        err: 'Update company failed!',
      });
    }
  }

  // list employess
  async index(req, res) {
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

    if (!(isAdmin || isCompany)) {
      return res.status(400).json({
        error: 'cannot list all company ',
      });
    }

    try {
      const company = await Company.findAll({
        attributes: ['id', 'username', 'company_name', 'employee_id'],
      });

      return res.status(200).json(company);
    } catch (err) {
      return res.status(500).json({
        err: 'List order failed!',
      });
    }
  }

  // destroy employees
  async destroy(req, res) {
    const { id } = req.params;

    const company = await Company.findByPk(id);
    const isAdmin = await Admin.findOne({
      where: {
        employee_id: req.activeUserId,
      },
    });

    if (!isAdmin) {
      return res.status(400).json({
        error: 'cannot destroy company',
      });
    }

    if (!company) {
      return res.status(400).json({
        error: 'Company does not exist',
      });
    }

    try {
      await Company.destroy({
        where: {
          id,
        },
      });

      return res.status(200).json({
        message: 'company deleted',
      });
    } catch (err) {
      if (err.parent.code === '23503') {
        return res.status(400).json({
          err:
            'Dont can remove Company with orders on system, set status to innactive',
        });
      }

      return res.status(500).json({
        err: 'Remove company failed!',
      });
    }
  }
}

export default new CompanyController();
