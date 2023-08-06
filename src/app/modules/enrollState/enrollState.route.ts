/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import { EnrollStateController } from './enrollState.controller';

const router = Router();

router.get('/', EnrollStateController.getEnrollState);
router.post('/', EnrollStateController.createEnrollState);
router.put('/', EnrollStateController.updateEnrollState);

export const EnrollStateRoutes = router;
