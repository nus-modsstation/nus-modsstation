import moment from 'moment';
import { createSelector } from 'reselect';
import { StudyGroup } from '../../models/StudyGroup';

const selectStudyGroup = (state) => state.studyGroup;

// select my groups which are not over yet
export const selectMyGroups = createSelector(
  [selectStudyGroup],
  (studyGroup) => {
    const now = moment();
    return studyGroup.myGroups
      .map((group) => StudyGroup.fromJson(group))
      .filter((group) => group.endTime.isAfter(now));
  }
);

// select study groups by module which are not over yet
export const selectStudyGroupsByModule = (moduleCode) =>
  createSelector([selectStudyGroup], (studyGroup) => {
    const now = moment();
    if (studyGroup[moduleCode] == null) return [];
    return studyGroup[moduleCode]
      .map((group) => StudyGroup.fromJson(group))
      .filter((group) => group.endTime.isAfter(now));
  });

export const selectGroupError = createSelector(
  [selectStudyGroup],
  (studyGroup) => studyGroup.error
);

export const selectCreateSuccess = createSelector(
  [selectStudyGroup],
  (studyGroup) => studyGroup.createSuccess
);
