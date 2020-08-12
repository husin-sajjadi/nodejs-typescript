import {validate, ValidationError} from 'class-validator';
import {plainToClass} from 'class-transformer';
import 'reflect-metadata';

let myarrfinal: any;
export const findAllByKey = (obj: any, keyToFind: any): [] => {
    return Object.entries(obj)
        .reduce((acc: any, [key, value]: any) => (key === keyToFind)
            ? acc.concat(value)
            : (typeof value === 'object')
                ? acc.concat(findAllByKey(value, keyToFind))
                : acc
            , [])
};

export const getErrorDetails = (array: any): [] => {
    const arr = array.reduce((r: any, o: any) => {
        o.children.forEach((item: any, key: any) => {
            if (item.constraints) {
                r.push(item.constraints);
            }
        });

        if (o.children.length > 0)
            getErrorDetails(o.children);
        else
            r.push(o.constraints);

        return r;
    }, []);
    return arr;
};

export const validation = (body: any, objectClass: any) => {
    let params = plainToClass(objectClass, body);

    return new Promise((resolve, reject) => {
        resolve(true);
        validate(params, {
            validationError: {target: false},
            whitelist: true,
            skipMissingProperties: true
        }).then((errors: ValidationError[]) => {
            if (errors.length > 0) {
                reject(findAllByKey(errors, 'constraints'));
            } else {
                resolve('validation succeed');
            }
        });
    });
};
