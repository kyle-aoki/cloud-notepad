import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useFileSystemControl } from '../../../redux/reducers/file-system/control';
import { useMenuControl } from '../../../redux/reducers/menu/control';
import { MenuType } from '../../../redux/reducers/menu/reducer';
import { DropdownMenuItem, DropdownMenuSeperator } from './components/dropdown';
import MenuItem from './components/menu-item';

interface FileProps {}

const File: FC<FileProps> = () => {
  const FileSystemControl = useFileSystemControl();
  const MenuControl = useMenuControl();

  const handleOpenClick = () => {
    FileSystemControl.OPEN_FILE_SYSTEM();
    FileSystemControl.GET_USER_DIR();
    MenuControl.CLOSE_ALL();
  };

  return (
    <MenuItem menuName="File" menuType={MenuType.file} offset={'43px'}>
      {/* <DropdownMenuItem>New</DropdownMenuItem> */}
      {/* <DropdownMenuItem>New Window</DropdownMenuItem> */}
      <DropdownMenuItem onClick={handleOpenClick}>Open...</DropdownMenuItem>
      {/* <DropdownMenuItem>Save</DropdownMenuItem> */}
      {/* <DropdownMenuItem>Save As...</DropdownMenuItem> */}
      {/* <DropdownMenuSeperator /> */}
      {/* <DropdownMenuItem>Page Setup...</DropdownMenuItem> */}
      {/* <DropdownMenuItem>Print...</DropdownMenuItem> */}
      {/* <DropdownMenuSeperator /> */}
      {/* <DropdownMenuItem>Exit</DropdownMenuItem> */}
    </MenuItem>
  );
};

export default File;
