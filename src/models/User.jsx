export class User {
  constructor({
    id,
    email,
    username,
    isVerified,
    friends = [],
    friendRequests = [],
    modules = [],
  }) {
    this.id = id;
    this.email = email;
    this.username = username;
    this.isVerified = isVerified;
    this.friends = friends;
    this.friendRequests = friendRequests;
    this.modules = modules;
  }

  static toJson(user) {
    return {
      id: user.uid,
      email: user.email,
      username: user.displayName,
      isVerified: user.emailVerified,
      friends: user.friends == null ? [] : user.friends,
      friendRequests: user.friendRequests == null ? [] : user.friendRequests,
      modules: user.modules == null ? [] : user.modules,
    };
  }
}
