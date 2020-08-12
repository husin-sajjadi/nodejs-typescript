import {createPool} from 'mysql2/promise';
import {env} from './env';

export const connect = new Promise((resolve, reject) => {
    let preparepool = createPool({
        host: env.MYSQL_HOST,
        user: env.MYSQL_USER,
        password: env.MYSQL_PASS,
        database: env.MYSQL_DB,
        multipleStatements: true,
        port: env.MYSQL_PORT,
        connectionLimit: 10
    });
    resolve(preparepool)

});
