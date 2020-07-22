export class VirtualGroup {
  static searchOptions = [
    { type: 'module', option: 'MOD1001', color: 'primary' },
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
    isPublic = true,
    moduleCode,
    groupName,
    groupAvatar,
    description,
  }) {
    this.id = id;
    this.ownerId = ownerId;
    this.users = users;
    this.userRequests = userRequests;
    this.isPublic = isPublic;
    this.moduleCode = moduleCode;
    this.groupName = groupName;
    this.groupAvatar = groupAvatar;
    this.description = description;
  }

  static fromJson(data) {
    return {
      ...data,
    };
  }

  static toJson({ data, creatorId, isPublic }) {
    // set module code and delete module field
    data.moduleCode = data.module.moduleCode;
    delete data.module;
    return {
      ...data,
      ownerId: creatorId,
      users: [creatorId],
      userRequests: [],
      isPublic: isPublic,
    };
  }
}

export const sampleData = [
  {
    id: 0,
    ownerId: 0,
    groupName: 'Hello world',
    moduleCode: 'CS2030',
    description: 'Hello world!',
  },
  {
    id: 1,
    ownerId: 1,
    groupName: 'Box.of(8)',
    moduleCode: 'CS2030',
    description: 'The Box is SOLID',
  },
  {
    id: 2,
    ownerId: 2,
    groupName: 'Class group extends ModsStation',
    moduleCode: 'CS2030',
    description: 'static String study() { return A+; }',
  },
  {
    id: 3,
    ownerId: 3,
    groupName: 'Lazy evaluators',
    moduleCode: 'CS2030',
    description: '() -> evaluate(result)',
  },
  {
    id: 4,
    ownerId: 4,
    groupName: 'An interesting group name',
    moduleCode: 'CS2030',
    description: 'An interesting group description',
  },
  {
    id: 5,
    ownerId: 5,
    groupName: 'An eye-catching group name',
    moduleCode: 'CS2030',
    description: 'An appealing group description',
  },
  {
    id: 6,
    ownerId: 6,
    groupName: 'Star Platinum',
    moduleCode: 'CS2030',
    description: 'ARE YOU APPROACHING ME JOTARO?',
  },
  {
    id: 7,
    ownerId: 7,
    groupName: 'The name is Bond',
    moduleCode: 'CS2030',
    description: 'James Bond',
  },
  {
    id: 10,
    ownerId: 10,
    groupName: 'But can we do better',
    moduleCode: 'CS2040S',
    description: 'This algorithm is fast, BUT can we do better?',
  },
  {
    id: 11,
    ownerId: 11,
    groupName: 'Speed Demons',
    moduleCode: 'CS2040S',
    description: 'Gotta go fast',
  },
  {
    id: 12,
    ownerId: 12,
    groupName: 'Quicksort group',
    moduleCode: 'CS2040S',
    description: 'Works faster with two pivots rather than one!',
  },
  {
    id: 20,
    ownerId: 20,
    groupName: 'Sample group',
    moduleCode: 'MOD1001',
    description: 'Sample group description',
  },
  {
    id: 21,
    ownerId: 21,
    groupName: 'Sample group',
    moduleCode: 'MOD1001',
    description: 'Sample group description',
  },
];

export const cs2030SampleGroups = sampleData.filter(
  (virtualGroup) => virtualGroup.moduleCode === 'CS2030'
);

export const cs2040sSampleGroups = sampleData.filter(
  (virtualGroup) => virtualGroup.moduleCode === 'CS2040S'
);

export const testModuleGroups = sampleData.filter(
  (virtualGroup) => virtualGroup.moduleCode === 'MOD1001'
);
