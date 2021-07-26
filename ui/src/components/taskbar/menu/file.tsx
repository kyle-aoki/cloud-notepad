import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { FileSystem } from '../../file-system/redux';
import { Menu } from './redux/redux';
import { DropdownMenuItem, DropdownMenuSeperator } from './components/dropdown';
import MenuItem from './components/menu-item';

interface FileProps {}

const File: FC<FileProps> = () => {
  const MenuController = new Menu.Instance(useDispatch());

  return (
    <MenuItem menuName="File" menuType={Menu.Type.file} offset={'18px'}>
      <DropdownMenuItem>New</DropdownMenuItem>
      <DropdownMenuItem>New Window</DropdownMenuItem>
      <DropdownMenuItem onClick={() => MenuController.SAGA.OPEN_CLICK()}>Open...</DropdownMenuItem>
      <DropdownMenuItem onClick={() => MenuController.SAGA.SAVE_CLICK()}>Save</DropdownMenuItem>
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
