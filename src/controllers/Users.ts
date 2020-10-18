import * as express from 'express';
import { Request, Response } from 'express';

import { UserService } from '../services';
import { validateUser } from '../models';

const services = new UserService();

class Users {
  public path = '/api/users';
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  private intializeRoutes() {
    this.router.post(this.path, this.addUser);
  }

  private addUser = async (req: Request, res: Response) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await services.findUser(req.body);
    if (user) return res.status(400).send('User already registered.');

    const response = await services.createUser(req.body);
    res.send(response);
  };
}

export default Users;
