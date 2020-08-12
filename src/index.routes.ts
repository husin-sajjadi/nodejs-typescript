import {Router} from 'express';
import {indexWelcome} from './index.controllers';

const IndexRouter = Router();

IndexRouter.route('/').get(indexWelcome);

export default IndexRouter;
