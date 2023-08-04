import { Router } from 'express';
import { CourseController } from './course.controller';

const router = Router();

router.get('/', CourseController.getCourses);
router.get('/:id', CourseController.getSingleCourse);
router.get('/:slug', CourseController.getSingleCourseBySlug);
router.post('/', CourseController.createCourse);
router.delete('/:id');
router.patch('/:id', CourseController.updateCourse);

export const CourseRoutes = router;
