import * as _ from 'lodash';
import bcrypt from 'bcrypt';

import { UserProps } from '../types';
import { User } from '../models';

export default class UserServices {
  public async findUser(user_params: UserProps) {
    let user = await User.findOne({ email: user_params.email });
    if (user) return user.toObject();
    return false;
  }

  public async findUserById(id: number) {
    let user = await User.findById(id).select('-password');

    return user;
  }

  public async createUser(user_params: UserProps) {
    const salt = await bcrypt.genSalt(10);
    user_params.password = await bcrypt.hash(user_params.password, salt);
    let user = new User(_.pick(user_params, ['username', 'email', 'password']));

    await user.save();
    return _.pick(user, ['_id', 'username', 'email']);
  }

  public async validatePassword(reqPassword: string, userPassword: string) {
    const validPassword = await bcrypt.compare(reqPassword, userPassword);
    if (!validPassword) return false;
    return true;
  }
}
