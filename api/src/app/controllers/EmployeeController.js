import * as Yup from 'yup';
import Employee from '../models/Employee';
import Admin from '../models/Admin';
import Company from '../models/Company';

class EmployeeController {
  async store(req, res) {
    const schema = Yup.object().shape({
      username: Yup.string().required(),
      first_name: Yup.string().required(),
      last_name: Yup.string().required(),
      // employeer_id: Yup.number().required(),
      // position_id: Yup.number().required(),
      age: Yup.number(),
      date_birth: Yup.date(),
      balance: Yup.number(),
      avatar: Yup.string(),
      email: Yup.string()
        .email()
        .required(),
      status: Yup.boolean(),
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

    const employeeExists = await Employee.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!isAdmin) {
      return res.status(400).json({
        error: 'Cannot create employee',
      });
    }
    // If case employeer exists don´t create new
    if (employeeExists) {
      return res.status(400).json({
        error: 'Employee already exists.',
      });
    }

    // const { filename } = req.file;

    const {
      id,
      username,
      first_name,
      last_name,
      email,
      age,
      password,
      date_birth,
      balance,
      status,
      employeer_id,
      position_id,
    } = req.body;

    if (!employeer_id) {
      return res.status(400).json({
        error: 'Employeer not exists.',
      });
    }

    if (!position_id) {
      return res.status(400).json({
        error: 'Position not exists.',
      });
    }

    try {

      const employee = await Employee.create({
        id,
        username,
        first_name,
        last_name,
        email,
        age,
        password,
        date_birth,
        balance,
        status,
        // avatar: filename,
        employeer_id,
        position_id,
      });

      return res.status(200).json({
        id,
        username,
        first_name,
        last_name,
        email,
        age,
        password,
        date_birth,
        balance,
        status,
        // avatar: filename,
        employeer_id,
        position_id,
      });
    } catch (err) {
      if (err.parent.code === '23503') {
        return res.status(400).json({
          err: 'Foreignkey not exists!',
        });
      }

      return res.status(500).json({
        err: 'Employee create failed!',
      });
    }
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string(),
      first_name: Yup.string(),
      last_name: Yup.string(),
      employeer_id: Yup.number(),
      position_id: Yup.number(),
      age: Yup.number(),
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

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails.',
      });
    }

    const activeEmployee = await Employee.findByPk(req.activeUserId);
    const isAdmin = await Admin.findOne({
      where: {
        employee_id: req.activeUserId,
      },
    });

    const { id } = req.params;

    if (id !== activeEmployee.id && !isAdmin) {
      return res.status(401).json({
        error: 'Cannot update employee',
      });
    }

    const { filename } = req.file;

    const {
      age,
      date_birth,
      username,
      email,
      first_name,
      last_name,
      oldPassword,
      employeer_id,
      position_id,
    } = req.body;

    const employeeExists = await Employee.findByPk(id);

    if (!employeeExists) {
      return res.status(400).json({
        error: 'This user does not exists ',
      });
    }

    if (!!username && username !== activeEmployee.username) {
      return res.status(400).json({
        error: 'Cannot update username',
      });
    }

    if (oldPassword && !(await activeEmployee.checkPassword(oldPassword))) {
      return res.status(401).json({
        error: 'Password does not match',
      });
    }

    if (!employeer_id) {
      return res.status(400).json({
        error: 'Employeer not exists.',
      });
    }

    if (!position_id) {
      return res.status(400).json({
        error: 'Position not exists.',
      });
    }

    try {
      const employee = await Employee.findByPk(id);

      await employee.update(req.body);

      return res.json({
        id,
        username,
        first_name,
        last_name,
        email,
        age,
        date_birth,
        avatar: filename,
        employeer_id,
        position_id,
      });
    } catch (err) {
      if (err.parent.code === '23503') {
        return res.status(400).json({
          err: 'Foreignkey not exists!',
        });
      }

      return res.status(500).json({
        err: 'Employee update failed!',
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
        error: 'Cannot list all employees',
      });
    }

    try {
      const employee = await Employee.findAll({
        attributes: [
          'id',
          'username',
          'first_name',
          'last_name',
          'email',
          'age',
          'date_birth',
          'balance',
          'avatar',
          'status',
          'employeer_id',
          'position_id',
        ],
      });

      return res.status(200).json(employee);
    } catch (err) {
      return res.status(500).json({
        err: 'Employee index failed!',
      });
    }
  }

  // destroy employees
  async destroy(req, res) {
    // const employee = await Employee.findByPk(req.params.id);
    const { id } = req.params;
    const employee = await Employee.findByPk(id);
    const isAdmin = await Admin.findOne({
      where: {
        employee_id: req.activeUserId,
      },
    });

    if (!isAdmin) {
      return res.status(400).json({
        error: ' Cannot destroy employees',
      });
    }

    if (!employee) {
      return res.status(400).json({
        error: 'employee does not  exist',
      });
    }

    try {
      await Employee.destroy({
        where: {
          id,
        },
      });

      return res.status(200).json({
        message: 'employee deleted',
      });
    } catch (err) {
      if (err.parent.code === '23503') {
        return res.status(400).json({
          err:
            'Dont can remove employee with orders on system, set status to innactive',
        });
      }

      return res.status(500).json({
        err: 'Employee delete failed!',
      });
    }
  }
}

export default new EmployeeController();
