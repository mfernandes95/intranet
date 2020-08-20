import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import Company from '../models/Company';
import authConfig from '../../config/auth';
// required data for username
class SessionCompanyController {
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

    const company = await Company.findOne({
      where: {
        username,
      },
    });

    // if company dont not exist - error -
    if (!company) {
      return res.status(401).json({
        error: 'company not Found',
      });
    }

    // check password, if dont not - error -
    if (!(await company.checkPassword(password))) {
      return res.status(401).json({
        error: 'Password does not match',
      });
    }

    try {
      const { id, company_name } = company;

      return res.json({
        company: {
          id,
          username,
          company_name,
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
        err: 'Company login failed!',
      });
    }
  }
}
export default new SessionCompanyController();
