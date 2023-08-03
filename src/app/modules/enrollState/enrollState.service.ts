import { IEnrollState } from './enrollState.interface';
import { EnrollState } from './enrollState.model';

const getEnrollStateByUserId = async (
  userId: string
): Promise<IEnrollState | null> => {
  const result = await EnrollState.findOne({ userId }).populate('currentTopic');

  return result;
};

const getEnrollStateByCourseId = async (
  courseId: string
): Promise<IEnrollState | null> => {
  const result = await EnrollState.findOne({ courseId }).populate(
    'currentTopic'
  );

  return result;
};

const createEnrollState = async (
  payload: IEnrollState
): Promise<IEnrollState | null> => {
  const result = await EnrollState.create(payload);

  await result.populate('currentTopic');
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
  getEnrollStateByUserId,
  getEnrollStateByCourseId,
  createEnrollState,
  updateEnrollStateByUserId,
};
