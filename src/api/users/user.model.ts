import {connect} from '../../config/database';
import {UserObjects} from "./user.objects";

export class UserModel {
    private user: UserObjects = <UserObjects>{};
    users: Array<UserObjects> = [];
    _tableName: string = "tbl_user";
    _userId: number = 0;

    constructor(public itemConstructor?: UserObjects) {
        if (itemConstructor) {
            this.user = itemConstructor;
        }
    }


    set userId(value: number) {
        this._userId = value;
    }

    /**
     * this function will return all users
     * */
    getUsers(): Promise<Array<UserObjects>> {
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM ${this._tableName}`;
            connect.then((conn: any) => {
                conn.query(query, (err: any, result: Array<UserObjects>) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(result);
                    }
                });
            });
        });
    }

    /**
     * this function will update a user with posted information
     * then return updated user information
     * @returns {Promise}
     */
    updateUser(): Promise<UserObjects> {
        return new Promise((resolve, reject) => {
            let query = `UPDATE ${this._tableName} set `;
            Object.keys(this.user).map((key: string) => {
                let value = this.user[key as keyof UserObjects];
                query += ` '${key}' = '${value}'`;
            });
            query += ` WHERE userId = '${this._userId}'`

            connect.then((conn: any) => {
                conn.query(query, (err: any, result: any) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(this.user);
                    }
                });
            });
        });
    }

    /**
     * this function will create an user
     * then return user`s information
     * @returns {Promise}
     */
    createUser(): Promise<UserObjects> {
        return new Promise((resolve, reject) => {
            let query = `INSERT INTO '${this._tableName}'`;
            let objects = Object.keys(this.user).map((key) => {
                return key
            }).join(",");
            let values = Object.keys(this.user).map((key) => {
                return `'${this.user[key as keyof UserObjects]}'`
            }).join(",");
            query += `(${objects}) VALUES (${values})`;
            connect.then((conn: any) => {
                conn.query(query, (err: any, result: any) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(this.user);
                    }
                });
            });
        });
    }

    /**
     * this function will delete user with selected user id
     * @returns {Promise}
     */
    deleteUser() {
        return new Promise((resolve, reject) => {

            const query = `DELETE from ${this._tableName} WHERE userId = ${this._userId}`;
            connect.then((conn: any) => {
                conn.query(query, (err: any, result: any) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(1);
                    }
                });
            });

        });
    }
}
