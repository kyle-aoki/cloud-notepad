export default class UserAPI {
  static async createUser(username: string, password: string) {
    const res = await fetch('/api/create-user', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    const json = await res.json();
    return json;
  }

  static async checkUsername(username: string) {
    const res = await fetch('/api/check-username', {
      method: 'POST',
      body: JSON.stringify({ username }),
    });
    const json = await res.json();
    return json;
  }
}
