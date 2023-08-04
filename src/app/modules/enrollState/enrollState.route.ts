/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import { EnrollStateController } from './enrollState.controller';

const router = Router();

router.get('/', EnrollStateController.getEnrollState);
router.post('/', EnrollStateController.createEnrollState);

export const EnrollStateRoutes = router;
