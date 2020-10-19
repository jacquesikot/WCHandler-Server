import * as express from 'express';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as _ from 'lodash';

import { UserService } from '../services';
import { validateUser } from '../models';
import { JWT_KEY } from '../constants';
import { auth } from '../middlewares';

const services = new UserService();

class Users {
  public path = '/api/users';
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  private intializeRoutes() {
    this.router.post(this.path, this.addUser);
    this.router.get(this.path + '/me', auth, this.getUser);
  }

  private addUser = async (req: Request, res: Response) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await services.findUser(req.body);
    if (user) return res.status(400).send('User already registered.');

    const response = await services.createUser(req.body);

    // move getAuthToken() to a method on the User Model
    const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, JWT_KEY);
    res.header('x-auth-token', token).send(response);
  };

  private getUser = async (req: any, res: Response) => {
    const user = await services.findUserById(req.user._id);
    res.send(user);
  };
}

export default Users;
