import {Request, Response, NextFunction} from 'express';
import * as jwt from 'jsonwebtoken';
import {env} from '../config/env';

export const CheckJwt = (req: Request, res: Response, next: NextFunction) => {
    const fromApp = <string>req.headers['from'];

    if (fromApp && fromApp === 'app_application') {
        next();

        return;
    }

    const token = <string>req.headers['authorization'];

    if (token) {
        const accessToken = token.split(' ')[1];

        let jwtPayload;

        try {
            jwtPayload = <any>jwt.verify(accessToken, env.API_TOKEN_VERIFY);

            next();
        } catch (err) {
            res.status(401).send();

            return;
        }
    } else {
        res.status(401).send();

        return;
    }

};
