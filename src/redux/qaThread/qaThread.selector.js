import { createSelector } from 'reselect';
import { QAThread } from '../../models/QAThread';

const selectQAThread = (state) => state.qaThread;

export const selectMyQAThreads = createSelector([selectQAThread], (qaThread) =>
  qaThread.myThreads.map((thread) => QAThread.fromJson(thread))
);

export const selectMyStarredQAThreads = createSelector(
  [selectQAThread],
  (qaThread) =>
    qaThread.starredThreads.map((thread) => QAThread.fromJson(thread))
);

export const selectQAThreadsByModule = (moduleCode) =>
  createSelector([selectQAThread], (qaThread) => qaThread[moduleCode]);

export const selectCurrentQAThread = createSelector(
  [selectQAThread],
  (qaThread) =>
    qaThread.currentThread
      ? QAThread.fromJson(qaThread.currentThread)
      : qaThread.currentThread
);

export const selectQAThreadError = createSelector(
  [selectQAThread],
  (qaThread) => qaThread.error
);

export const selectCreateSuccess = createSelector(
  [selectQAThread],
  (qaThread) => qaThread.createSuccess
);

export const selectUpdateSuccess = createSelector(
  [selectQAThread],
  (qaThread) => qaThread.updateSuccess
);

export const selectUpdateError = createSelector(
  [selectQAThread],
  (qaThread) => qaThread.updateError
);
