import * as Yup from 'yup';
import Position from '../models/Position';
import Admin from '../models/Admin';
import Employee from '../models/Employee';

class PositionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      position: Yup.string().required(),
      level: Yup.number().required(),
    });

    // If schema invalid
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails.',
      });
    }

    const { id, position, level } = req.body;

    const isAdmin = await Admin.findOne({
      where: {
        employee_id: req.activeUserId,
      },
    });

    if (!isAdmin) {
      return res.status(401).json({
        error: 'Cannot create positions',
      });
    }

    const positionExists = await Position.findOne({
      where: {
        position: req.body.position,
      },
    });

    if (positionExists) {
      return res.status(400).json({
        error: 'Position already exists.',
      });
    }

    try {
      await Position.create(req.body);

      return res.json({
        id,
        position,
        level,
      });
    } catch (err) {
      return res.status(500).json({
        err: 'Position create failed!',
      });
    }
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      position: Yup.string(),
      level: Yup.string(),
    });

    // If schema invalid
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails.',
      });
    }

    const { id } = req.params;
    const { position, level } = req.body;

    const positionUser = await Position.findByPk(id);
    const isAdmin = await Admin.findOne({
      where: {
        employee_id: req.activeUserId,
      },
    });

    if (!isAdmin) {
      return res.status(401).json({
        error: 'You are not admin',
      });
    }

    if (!positionUser) {
      return res.status(400).json({
        error: 'This position does not exists',
      });
    }

    if (!!position && position !== positionUser.position) {
      const positionExists = await Position.findOne({
        where: {
          position,
        },
      });

      if (positionExists) {
        return res.status(400).json({
          error: 'This position already exists',
        });
      }
    }

    try {
      await positionUser.update(req.body);

      return res.json({
        id,
        position,
        level,
      });
    } catch (err) {
      return res.status(500).json({
        err: 'Position update failed!',
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
        error: 'You cannot list all positions',
      });
    }

    try {
      const position = await Position.findAll({
        attributes: ['id', 'position', 'level'],
      });

      return res.status(200).json(position);
    } catch (err) {
      return res.status(500).json({
        err: 'Position update failed!',
      });
    }
  }

  // destroy employees
  async destroy(req, res) {
    const { id } = req.params;

    const isAdmin = await Admin.findOne({
      where: {
        employee_id: req.activeUserId,
      },
    });

    if (isAdmin) {
      return res.status(400).json({
        error: 'You are not admin',
      });
    }

    const position = await Position.findByPk(id);

    if (!position) {
      return res.status(400).json({
        error: 'This position does not exists',
      });
    }

    try {
      await Position.destroy({
        where: {
          id,
        },
      });

      return res.status(200).json({
        message: 'Position deleted',
      });
    } catch (err) {
      return res.status(500).json({
        err: 'Position delete failed!',
      });
    }
  }
}

export default new PositionController();
