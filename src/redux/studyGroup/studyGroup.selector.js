import moment from 'moment';
import { createSelector } from 'reselect';
import { StudyGroup } from '../../models/StudyGroup';

const selectStudyGroup = (state) => state.studyGroup;

export const selectMyGroups = createSelector(
  [selectStudyGroup],
  (studyGroup) => {
    const now = moment();
    return studyGroup.myGroups
      .map((group) => StudyGroup.fromJson(group))
      .filter((group) => group.startTime.isAfter(now));
  }
);

export const selectStudyGroupsByModule = (moduleCode) =>
  createSelector([selectStudyGroup], (studyGroup) => {
    const now = moment();
    return studyGroup[moduleCode]
      .map((group) => StudyGroup.fromJson(group))
      .filter((group) => group.startTime.isAfter(now));
  });

export const selectGroupError = createSelector(
  [selectStudyGroup],
  (studyGroup) => studyGroup.error
);

export const selectCreateSuccess = createSelector(
  [selectStudyGroup],
  (studyGroup) => studyGroup.createSuccess
);
