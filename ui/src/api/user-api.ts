export default class UserAPI {
  static async createUser(username: string, password: string) {
    const res = await fetch('/api/user/create-user', {
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    const json = await res.json();
    return json;
  }

  static async checkUsername(username: string) {
    const res = await fetch('/api/user/check-username', {
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ username }),
    });
    const json = await res.json();
    return json;
  }

  static async checkPassword(password: string) {
    const res = await fetch('/api/user/check-password', {
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ password }),
    });
    const json = await res.json();
    return json;
  }

  static async LogIn(username: string, password: string) {
    const res = await fetch('/api/user/log-in', {
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    const json = await res.json();
    console.log('/api/user/log-in', json);
    return json;
  }
}
