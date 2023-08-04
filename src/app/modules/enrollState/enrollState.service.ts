import { Course } from '../course/course.model';
import { IEnrollState } from './enrollState.interface';
import { EnrollState } from './enrollState.model';

const getEnrollState = async (
  user: string,
  course: string
): Promise<IEnrollState | null> => {
  const result = await EnrollState.findOne({ user, course }).populate(
    'currentTopic'
  );

  return result;
};

const createEnrollState = async (
  payload: IEnrollState
): Promise<IEnrollState | null> => {
  const course = await Course.findById(payload.course);
  const result = await EnrollState.create({
    ...payload,
    currentTopic: course?.topics[0]._id,
  });

  // await result.populate('currentTopic');
  return result;
};

const updateEnrollStateByUserId = async (
  userId: string,
  payload: IEnrollState
): Promise<IEnrollState | null> => {
  const result = await EnrollState.findOneAndUpdate({ userId }, payload, {
    new: true,
  });

  return result;
};

export const EnrollStateService = {
  getEnrollState,
  createEnrollState,
  updateEnrollStateByUserId,
};