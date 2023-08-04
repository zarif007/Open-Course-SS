import { Router } from 'express';
import { CourseRoutes } from '../modules/course/course.route';
import { EnrollStateRoutes } from '../modules/enrollState/enrollState.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/course',
    route: CourseRoutes,
  },
  {
    path: '/enrollState',
    route: EnrollStateRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
