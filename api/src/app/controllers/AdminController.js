import * as Yup from 'yup';
import Admin from '../models/Admin';

class AdminController {
  async update(req, res) {
    const schema = Yup.object().shape({
      username: Yup.string(),
      email: Yup.string().email(),
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

    const { username, oldPassword } = req.body;

    const isAdmin = await Admin.findByPk(req.activeUserId);

    if (!isAdmin) {
      return res.status(400).json({
        error: 'You are cannot update the admin',
      });
    }

    if (!!username && username !== isAdmin.username) {
      return res.status(400).json({
        error: "if don't cant put",
      });
    }

    // If fot put password need input a password
    if (oldPassword && !(await isAdmin.checkPassword(oldPassword))) {
      return res.status(401).json({
        error: 'Password does not match',
      });
    }

    try {
      const { id, email } = await isAdmin.update(req.body);

      return res.status(200).json({
        id,
        username,
        email,
      });
    } catch (err) {
      if (err.parent.code === '23503') {
        return res.status(400).json({
          err: 'Foreignkey not exists!',
        });
      }

      return res.status(500).json({
        err: 'Update admin failed!',
      });
    }
  }

  // list Admins
  async index(req, res) {
    const isAdmin = await Admin.findOne({
      where: {
        employee_id: req.activeUserId,
      },
    });

    if (!isAdmin) {
      return res.status(400).json({
        error: 'You are cannot list all admins',
      });
    }

    try {
      const admin = await Admin.findAll({
        attributes: ['id', 'username', 'email', 'company_id'],
      });

      return res.status(200).json(admin);
    } catch (err) {
      return res.status(500).json({
        err: 'Admin index failed!',
      });
    }
  }

  // destroy Admin
  async destroy(req, res) {
    const { id } = req.params;

    const isAdmin = await Admin.findOne({
      where: {
        employee_id: req.activeUserId,
      },
    });
    const admin = await Admin.findByPk(id);

    if (!isAdmin) {
      return res.status(400).json({
        error: 'You are cannot destroy the admin',
      });
    }

    if (!admin) {
      return res.status(400).json({
        error: 'This admin does not exists',
      });
    }

    try {
      await Admin.destroy({
        where: {
          id,
        },
      });

      return res.status(200).json({
        message: 'Admin deleted',
      });
    } catch (err) {
      return res.status(500).json({
        err: 'Delete admin failed!',
      });
    }
  }
}

export default new AdminController();
