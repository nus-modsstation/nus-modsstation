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
    { type: 'module', option: 'CS2101', color: 'primary' },
    { type: 'module', option: 'CS2102', color: 'primary' },
    { type: 'module', option: 'CS2103', color: 'primary' },
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

export const studyGroupData = [
  {
    id: '0',
    ownerId: '0',
    location: 'COM1',
    startTime: moment().subtract(60, 'minutes'),
    endTime: moment().add(60, 'minutes'),
    moduleCode: 'CS2040S',
    title: 'SPT ps8',
    description: "Let's do SPT ps8",
  },
  {
    id: '1',
    ownerId: '1',
    location: 'Central library',
    startTime: moment().subtract(50, 'minutes'),
    endTime: moment().add(50, 'minutes'),
    moduleCode: 'CS2030S',
    title: 'Completable Future',
    description: 'When would it complete?',
  },
  {
    id: '2',
    ownerId: '2',
    location: 'COM1',
    startTime: moment().subtract(40, 'minutes'),
    endTime: moment().add(40, 'minutes'),
    moduleCode: 'CS2106',
    title: 'Seg fault or page fault',
    description: 'Discuss about the causes of seg fault and page fault',
  },
  {
    id: '3',
    ownerId: '3',
    location: 'COM2',
    startTime: moment().subtract(55, 'minutes'),
    endTime: moment().add(55, 'minutes'),
    moduleCode: 'CS2040S',
    title: 'BFS & DFS',
    description: 'Understand and analyze the BFS/DFS algorithms',
  },
  {
    id: '4',
    ownerId: '4',
    location: 'COM1',
    startTime: moment().subtract(65, 'minutes'),
    endTime: moment().add(65, 'minutes'),
    moduleCode: 'CS2106',
    title: 'File system',
    description: 'Discuss about the pro and cons of various file system',
  },
  {
    id: '5',
    ownerId: '5',
    location: 'I3',
    startTime: moment().subtract(35, 'minutes'),
    endTime: moment().add(35, 'minutes'),
    moduleCode: 'CS2030',
    title: 'PECS generics',
    description: 'Understand what is PECS and how to apply it',
  },
  {
    id: '6',
    ownerId: '6',
    location: 'COM2',
    startTime: moment().subtract(65, 'minutes'),
    endTime: moment().add(65, 'minutes'),
    moduleCode: 'CS2040S',
    title: 'Travelling salesman problem',
    description: "Let's discuss the travelling salesman problem",
  },
  {
    id: '7',
    ownerId: '7',
    location: 'Central library',
    startTime: moment().add(60, 'minutes'),
    endTime: moment().add(120, 'minutes'),
    moduleCode: 'CS2040S',
    title: 'Bellman ford or dijkstra',
    description: 'When to use Bellman ford or dijkstra algo?',
  },
  {
    id: '8',
    ownerId: '8',
    location: 'AS1',
    startTime: moment().add(70, 'minutes'),
    endTime: moment().add(140, 'minutes'),
    moduleCode: 'CS2030',
    title: 'Stream reduce',
    description: 'Discuss about the different types of reduce',
  },
  {
    id: '9',
    ownerId: '9',
    location: 'HSSML',
    startTime: moment().add(30, 'minutes'),
    endTime: moment().add(90, 'minutes'),
    moduleCode: 'CS2106',
    title: 'Buddy system',
    description: 'Understand and analyze the buddy system implementation',
  },
  {
    id: 10,
    ownerId: 10,
    location: 'I3',
    startTime: moment().add(45, 'minutes'),
    endTime: moment().add(115, 'minutes'),
    moduleCode: 'CS2106',
    title: 'Process synchronization',
    description: 'Implement the process syncrhonization and avoid deadlock',
  },
  {
    id: '11',
    ownerId: '11',
    location: 'COM2',
    startTime: moment().add(200, 'minutes'),
    endTime: moment().add(300, 'minutes'),
    moduleCode: 'CS2106',
    title: 'Dining philosopher',
    description: 'Understand the dining philosophers and its implementation',
  },
];

const availableData = studyGroupData.filter(
  (studyGroup) =>
    studyGroup.startTime.isBefore(moment()) &&
    studyGroup.endTime.isAfter(moment())
);
const cs2040sData = studyGroupData.filter(
  (studyGroup) => studyGroup.moduleCode === 'CS2040S'
);
const cs2030Data = studyGroupData.filter(
  (studyGroup) => studyGroup.moduleCode === 'CS2030'
);
const cs2106Data = studyGroupData.filter(
  (studyGroup) => studyGroup.moduleCode === 'CS2106'
);

export const sections = [
  {
    title: 'available now',
    data: availableData,
  },
  {
    title: 'CS2040S',
    data: cs2040sData,
  },
  {
    title: 'CS2030',
    data: cs2030Data,
  },
  {
    title: 'CS2106',
    data: cs2106Data,
  },
];

export const upcomingGroupData = [
  {
    time: moment().add(12, 'hours'),
    groupTitle: 'AVL Tree',
    module: 'CS2040S',
    location: 'COM1',
  },
  {
    time: moment().add(13, 'hours'),
    groupTitle: 'Parallel Stream',
    module: 'CS2030',
    location: 'I3',
  },
];
