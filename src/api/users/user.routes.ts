import {Router} from 'express';
import {CheckJwt} from '../../middlewares/checkJwt';
import {UserController} from './user.controller';

const UserRoutes = Router();
const userController = new UserController();

UserRoutes.route('/')
    .get(userController.getUsers)
UserRoutes.route('/userCrowd')
    .patch(userController.updateUser)
    .post(userController.createUser)
    .delete(userController.deleteUser)
    //CheckJwt is used for authorization
    //.delete(CheckJwt, userController.deleteUser);

export default UserRoutes;
