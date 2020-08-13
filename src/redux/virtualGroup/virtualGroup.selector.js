import { createSelector } from 'reselect';
import { VirtualGroup } from '../../models/VirtualGroup';

const selectVirtualGroup = (state) => state.virtualGroup;

export const selectMyVirtualGroups = createSelector(
  [selectVirtualGroup],
  (virtualGroup) =>
    virtualGroup.myGroups.map((group) => VirtualGroup.fromJson(group))
);

export const selectVirtualGroupsByModule = (moduleCode) =>
  createSelector(
    [selectVirtualGroup],
    (virtualGroup) => virtualGroup[moduleCode]
  );

export const selectVirtualGroupError = createSelector(
  [selectVirtualGroup],
  (virtualGroup) => virtualGroup.error
);

export const selectCreateSuccess = createSelector(
  [selectVirtualGroup],
  (virtualGroup) => virtualGroup.createSuccess
);

export const selectUpdateSuccess = createSelector(
  [selectVirtualGroup],
  (virtualGroup) => virtualGroup.updateSuccess
);

export const selectUpdateError = createSelector(
  [selectVirtualGroup],
  (virtualGroup) => virtualGroup.updateError
);

export const selectSendRequestSuccess = createSelector(
  [selectVirtualGroup],
  (virtualGroup) => virtualGroup.SendRequestSuccess
);

export const selectSendRequestError = createSelector(
  [selectVirtualGroup],
  (virtualGroup) => virtualGroup.SendRequestError
);

export const selectSwitchRecruitingModeError = createSelector(
  [selectVirtualGroup],
  (virtualGroup) => virtualGroup.switchRecruitingModeError
);
