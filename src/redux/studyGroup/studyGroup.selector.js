import { createSelector } from 'reselect';
import { StudyGroup } from '../../models/StudyGroup';

const selectStudyGroup = (state) => state.studyGroup;

export const selectMyGroups = createSelector([selectStudyGroup], (studyGroup) =>
  studyGroup.myGroups.map((group) => StudyGroup.fromJson(group))
);

export const selectStudyGroupsByModule = (moduleCode) =>
  createSelector([selectStudyGroup], (studyGroup) => studyGroup[moduleCode]);

export const selectGroupError = createSelector(
  [selectStudyGroup],
  (studyGroup) => studyGroup.error
);

export const selectCreateSuccess = createSelector(
  [selectStudyGroup],
  (studyGroup) => studyGroup.createSuccess
);
