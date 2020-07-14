export class QAThread {
  static searchOptions = [
    { type: 'module', option: 'MOD1001', color: 'primary' },
    { type: 'module', option: 'CS2030', color: 'primary' },
    { type: 'module', option: 'CS2040S', color: 'primary' },
    { type: 'module', option: 'CS2100', color: 'primary' },
    { type: 'module', option: 'CS2101', color: 'primary' },
    { type: 'module', option: 'CS2102', color: 'primary' },
    { type: 'module', option: 'CS2103', color: 'primary' },
  ];

  constructor({ id, ownerId, isOpen = true, moduleCode, taskName, chatRoom }) {
    this.id = id;
    this.ownerId = ownerId;
    this.isOpen = isOpen;
    this.moduleCode = moduleCode;
    this.taskName = taskName;
    this.chatRoom = chatRoom;
  }

  static fromJson(data) {
    return {
      ...data,
    };
  }

  static toJson({ data, creatorId }) {
    // set module code and delete module field
    data.moduleCode = data.module.id;
    delete data.module;
    return {
      ...data,
      ownerId: creatorId,
    };
  }
}
