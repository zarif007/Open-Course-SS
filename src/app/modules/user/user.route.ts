import { Router } from 'express';
import { UserController } from './user.controller';

const router = Router();

router.get('/byClerkId/:clerkId', UserController.getUserByClerkId);
router.get('/byUserName/:userName', UserController.getUserByUserName);
router.get('/byExternalId/:externalId', UserController.getUserByExternalId);
router.post('/', UserController.createUser);

export const UserRoutes = router;
