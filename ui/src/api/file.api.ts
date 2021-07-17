interface CreateFileRequestBody {
  fileName: string;
  filePath: string[];
  fileContent: string;
}

export default class FileAPI {
  static async GetUserDir() {
    const requestConfig = { method: 'GET' };
    const res = await fetch('/api/file/get-user-dir', requestConfig);
    const json = await res.json();
    return json;
  }

  static async CreateFile(createFileRequestBody: CreateFileRequestBody) {
    const requestConfig = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(createFileRequestBody),
    };
    const res = await fetch('/api/file/create-file', requestConfig);
    const json = await res.json();
    return json;
  }
}
