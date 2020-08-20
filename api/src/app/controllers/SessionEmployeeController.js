import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import Employee from '../models/Employee';
import authConfig from '../../config/auth';
// required data for username
class SessionEmployeeController {
  async store(req, res) {
    const schema = Yup.object().shape({
      username: Yup.string().required(),
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

    const { username, password } = req.body;
    const employee = await Employee.findOne({
      where: {
        username,
      },
    });

    // if employee dont not exist - error -
    if (!employee) {
      return res.status(401).json({
        error: 'employee not Found',
      });
    }
    // check password, if dont not - error -
    if (!(await employee.checkPassword(password))) {
      return res.status(401).json({
        error: 'Password does not match',
      });
    }

    try {
      const {
        id,
        first_name,
        email,
        last_name,
        date_birth,
        balance,
      } = employee;

      return res.json({
        employee: {
          id,
          username,
          email,
          first_name,
          last_name,
          date_birth,
          balance,
        },
        token: jwt.sign(
          {
            id,
          },
          authConfig.secret,
          {
            expiresIn: authConfig.expiresIn,
          }
        ),
      });
    } catch (err) {
      return res.status(500).json({
        err: 'Employee login failed!',
      });
    }
  }
}
export default new SessionEmployeeController();
