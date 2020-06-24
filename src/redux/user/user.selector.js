import { createSelector } from 'reselect';

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export const selectAuthError = createSelector(
  [selectUser],
  (user) => user.authError
);

export const selectUpdateSuccess = createSelector(
  [selectUser],
  (user) => user.updateSuccess
);

export const selectUpdateError = createSelector(
  [selectUser],
  (user) => user.updateError
);
