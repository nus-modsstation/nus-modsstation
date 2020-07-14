import moment from 'moment';

export class StudyGroup {
  static searchOptions = [
    { type: 'location', option: 'AS1', color: 'secondary' },
    { type: 'location', option: 'Central Library', color: 'secondary' },
    { type: 'location', option: 'COM1', color: 'secondary' },
    { type: 'location', option: 'COM2', color: 'secondary' },
    { type: 'location', option: 'HSSML', color: 'secondary' },
    { type: 'location', option: 'I3', color: 'secondary' },
    { type: 'module', option: 'CS2030', color: 'primary' },
    { type: 'module', option: 'CS2040S', color: 'primary' },
    { type: 'module', option: 'CS2100', color: 'primary' },
    { type: 'module', option: 'CS2106', color: 'primary' },
  ];
  constructor({
    id,
    ownerId,
    users = [],
    userRequests = [],
    moderators = [],
    location,
    isPublic = true,
    capacity = 4,
    startTime,
    endTime,
    moduleCode,
    title,
    description,
    attendances = {},
  }) {
    this.id = id;
    this.ownerId = ownerId;
    if (users.length === 0) {
      users.push(ownerId);
    }
    this.users = users;
    this.userRequests = userRequests;
    this.moderators = moderators;
    this.location = location;
    this.isPublic = isPublic;
    this.capacity = capacity;
    this.startTime = startTime;
    this.endTime = endTime;
    this.moduleCode = moduleCode;
    this.title = title;
    this.description = description;
    this.attendances = attendances;
    if (this.attendances.length === 0) {
      attendances = {
        ownerId: false,
      };
    }
  }

  static fromJson(data) {
    return {
      ...data,
      startTime: moment(data.startTime),
      endTime: moment(data.endTime),
    };
  }

  static toJson({ data, currentUserId }) {
    // set moduleCode and delete module field
    data.moduleCode = data.module.id;
    delete data.module;
    return {
      ...data,
      startTime: data.startTime.toDate(),
      endTime: data.endTime.toDate(),
      ownerId: currentUserId,
      users: [currentUserId],
      userRequests: [],
      moderators: [currentUserId],
      isPublic: true,
      attendances: {
        [currentUserId]: false,
      },
    };
  }
}
