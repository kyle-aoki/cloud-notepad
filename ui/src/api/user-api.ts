export default class UserAPI {
  static api_key = '123';

  static async createUser(username: string, password: string) {
    const res = await fetch('/api/create-user', {
      headers: {
        api_key: UserAPI.api_key,
        'content-type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    const json = await res.json();
    return json;
  }

  static async checkUsername(username: string) {
    try {
      const res = await fetch('/api/check-username', {
        headers: {
          api_key: UserAPI.api_key,
          'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ username: username }),
      });
      const json = await res.json();
      return json;
    } catch (error) {
      return 'FETCH_ERROR';
    }
  }

  static async checkPassword(password: string) {
    try {
      const res = await fetch('/api/check-password', {
        headers: {
          api_key: UserAPI.api_key,
          'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ password: password }),
      });
      const json = await res.json();
      return json;
    } catch (error) {
      return 'FETCH_ERROR';
    }
  }
}
