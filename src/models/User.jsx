export class User {
  constructor({
    id,
    username,
    friends = [],
    friendRequests = [],
    modules = [],
  }) {
    this.id = id;
    this.username = username;
    this.friends = friends;
    this.friendRequests = friendRequests;
    this.modules = modules;
  }

  static toJson(user) {
    return {
      id: user.id,
      friends: user.friends,
      friendRequests: user.friendRequests,
      modules: user.modules,
    };
  }
}
