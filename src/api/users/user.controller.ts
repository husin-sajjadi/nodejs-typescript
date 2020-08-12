import {Request, Response} from 'express';
import {UserModel} from './user.model';
import {validation} from '../../config/utils';
import {UserIdObject, UserObjects} from "./user.objects";

export class UserController {

    getUsers(req: Request, res: Response) {
        const Users = new UserModel();
        Users.getUsers().then((userList: Array<UserObjects>) => {
            return res.status(200).json({
                result: 1,
                recordCount: userList.length,
                contents: userList
            });
        }).catch((err: any) => {
            return res.status(404).json({
                result: 0,
                message: 'no user found',
                error: {err}
            });
        });
    }
    updateUser(req: Request, res: Response) {
        const userInfo = req.body;
        validation(userInfo, UserObjects).then(() => {
            const Users = new UserModel(userInfo);
            Users.userId = userInfo.userId;
            Users.updateUser().then((user: UserObjects) => {
                return res.status(200).json({
                    result: 1,
                    message: 'update successfully',
                    content: {
                        user: user
                    }
                });
            }).catch(err => {
                return res.status(500).json({
                    result: 0,
                    message: 'failed to update user',
                    error: {err}
                });
            });
        }).catch(err => {
            return res.status(400).json({
                result: 0,
                message: 'validation error',
                error: err
            });
        });
    }
    createUser(req: Request, res: Response) {
        const userInfo = req.body;
        validation(userInfo, UserObjects).then(() => {
            const Users = new UserModel(userInfo);
            Users.userId = userInfo.userId;
            Users.createUser().then((user: UserObjects) => {
                return res.status(200).json({
                    result: 1,
                    message: 'update successfully',
                    content: {
                        user: user
                    }
                });
            }).catch(err => {
                return res.status(500).json({
                    result: 0,
                    message: 'failed to update user',
                    error: {err}
                });
            });
        }).catch(err => {
            return res.status(400).json({
                result: 0,
                message: 'validation error',
                error: err
            });
        });
    }
    deleteUser(req: Request, res: Response) {
        validation(req.query, UserIdObject).then(() => {
            const Users = new UserModel();
            Users.userId = Number(req.query.userId);
            Users.deleteUser().then(result => {
                return res.status(200).json({
                    result: 1,
                    message: 'delete user successfully'
                });
            }).catch(err => {
                return res.status(404).json({
                    result: 0,
                    message: 'failed to delete user or user you want to delete is not exist anymore',
                    error: {err}
                });
            });
        }).catch(err => {
            return res.status(400).json({
                result: 0,
                message: 'validation error',
                error: err
            });
        });
    }
}
