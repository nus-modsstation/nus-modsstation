import { moduleList } from './moduleList.js';

export class Module {
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
  }

  static getModuleByModuleCode(moduleCode) {
    return modules.find((module) => module.moduleCode === moduleCode);
  }
}

export const modules = moduleList;
