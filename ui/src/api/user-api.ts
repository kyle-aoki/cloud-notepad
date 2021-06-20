export default class UserAPI {
  static api_key = { api_key: '123' };

  static async createUser(username: string, password: string) {
    const res = await fetch('/api/create-user', {
      headers: {
        ...this.api_key,
      },
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    const json = await res.json();
    return json;
  }

  static async checkUsername(username: string) {
    const res = await fetch('/api/check-username', {
      headers: {
        ...this.api_key,
      },
      method: 'POST',
      body: JSON.stringify({ username }),
    });
    const json = await res.json();
    return json;
  }
}
