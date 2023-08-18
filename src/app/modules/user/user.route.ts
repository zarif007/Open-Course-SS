import { Router } from 'express';
import { UserController } from './user.controller';

const router = Router();

router.get('/byClerkId/:clerkId', UserController.getUserByClerkId);
router.post('/', UserController.upsertUser);

export const UserRoutes = router;
