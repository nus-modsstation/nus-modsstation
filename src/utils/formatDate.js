import moment from 'moment';

export const formatTime = (startTime, endTime) => {
  const now = moment();
  if (startTime.isBefore(now) && endTime.isAfter(now)) {
    return 'Until ' + endTime.format('hh:mm A');
  } else {
    return 'At ' + endTime.format('hh:mm A');
  }
};

export const formatDateTime = (dateTime) => {
  return dateTime.format('MMM D, hh:mm A');
};
