import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import Admin from '../models/Admin';
import authConfig from '../../config/auth';
// required data for username
class SessionAdminController {
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
    const admin = await Admin.findOne({
      where: {
        username,
      },
    });

    // If admin don't exist
    if (!admin) {
      return res.status(401).json({
        error: 'Admin not Found',
      });
    }

    // Check password, if don't match
    if (!(await admin.checkPassword(password))) {
      return res.status(401).json({
        error: 'Password does not match',
      });
    }
    try {
      const { id, email } = admin;
      return res.json({
        admin: {
          id,
          username,
          email,
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
        err: 'Admin login',
      });
    }
  }
}
export default new SessionAdminController();
