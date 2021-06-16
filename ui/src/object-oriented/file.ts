
export enum FileType {
  txt,
  json,
  js,
  ts,
  hmtl,
  css
}

class File {

  name: string;
  size: number;
  type: FileType
  dateModified: number;

  constructor(name: string, size: number, type: FileType){

    this.name = name;
    this.size = size;
    this.type = type;
    this.dateModified = Date.now();

  }

}

export default File;
