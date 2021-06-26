export default class FileAPI {
  static api_key = '123';

  static async GetUserDir() {
    const requestConfig = { method: 'POST' };
    const res = await fetch('/api/file/get-user-dir', requestConfig);
    const json = await res.json();
    return json;
  }
}
