import * as express from 'express';
import { Request, Response } from 'express';
import Joi from 'joi';

import { UserService } from '../services';

const services = new UserService();

class Auth {
  public path = '/api/auth';
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  private intializeRoutes() {
    this.router.post(this.path, this.addUser);
  }

  private addUser = async (req: Request, res: Response) => {
    // move the validate function to userServices later
    const validateAuth = (req: Request) => {
      const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
      });

      return schema.validate(req);
    };
    const { error } = validateAuth(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await services.findUser(req.body);
    if (!user) return res.status(400).send('Invalid email or password');

    const validPassword = await services.validatePassword(
      req.body.password,
      user.password
    );

    if (!validPassword)
      return res.status(400).send('Invalid email or password');
    res.send(true);
  };
}

export default Auth;
