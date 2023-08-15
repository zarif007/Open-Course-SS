import { Router } from 'express';
import { CourseController } from './course.controller';

const router = Router();

router.get('/', CourseController.getCourses);
router.get('/byId/:id', CourseController.getSingleCourse);
router.get('/bySlug/:slug', CourseController.getSingleCourseBySlug);
router.post('/', CourseController.createCourse);
router.delete('/:id');
router.put('/:id', CourseController.updateCourse);

export const CourseRoutes = router;
