import moment from 'moment';

export const formatTime = (startTime, endTime) => {
  const now = moment();
  // ensure the time is moment
  startTime = moment(startTime);
  endTime = moment(endTime);
  if (startTime.isBefore(now) && endTime.isAfter(now)) {
    return 'Until ' + endTime.format('hh:mm A');
  } else {
    return 'At ' + startTime.format('hh:mm A');
  }
};

export const formatMessageTime = (time) => {
  const momentTime = moment(time);
  return momentTime.format('hh:mm A');
};

export const formatDateTime = (dateTime) => {
  return dateTime.format('MMM D hh:mm A');
};

export const dateTimeFormat = 'MMM Do hh:mm A';
