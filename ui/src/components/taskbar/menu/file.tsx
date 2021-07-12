import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { FileSystem } from '../../file-system/redux';
import { Menu } from '../redux';
import { DropdownMenuItem, DropdownMenuSeperator } from './components/dropdown';
import MenuItem from './components/menu-item';

interface FileProps {}

const File: FC<FileProps> = () => {
  const FileSystemController = new FileSystem.Instance(useDispatch());
  const MenuControl = new Menu.Instance(useDispatch());

  const handleOpenClick = () => {
    FileSystemController.OPEN_FILE_SYSTEM();
    FileSystemController.GET_USER_DIR();
    MenuControl.CLOSE_ALL();
  };

  return (
    <MenuItem menuName="File" menuType={Menu.Type.file} offset={'54px'}>
      <DropdownMenuItem>New</DropdownMenuItem>
      <DropdownMenuItem>New Window</DropdownMenuItem>
      <DropdownMenuItem onClick={handleOpenClick}>Open...</DropdownMenuItem>
      <DropdownMenuItem>Save</DropdownMenuItem>
      <DropdownMenuItem>Save As...</DropdownMenuItem>
      <DropdownMenuSeperator />
      <DropdownMenuItem>Page Setup...</DropdownMenuItem>
      <DropdownMenuItem>Print...</DropdownMenuItem>
      <DropdownMenuSeperator />
      <DropdownMenuItem>Exit</DropdownMenuItem>
    </MenuItem>
  );
};

export default File;
