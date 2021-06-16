import File from "./file";

type Directory = (File | Folder)[];

class Folder {

  name: string;
  size: number;
  dateModified: number;
  directory: Directory;

  constructor(name: string, size: number){
    this.name = name;
    this.size = size;
    this.dateModified = Date.now();
    this.directory = [];
  }

}

export default Folder;
