import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { FileSystemActions } from '../../../redux/reducers/file-system';
import { MenuActions, MenuType } from '../../../redux/reducers/menu';
import { DropdownMenuItem, DropdownMenuSeperator } from './components/dropdown';
import MenuItem from './components/menu-item';

interface FileProps {}

const File: FC<FileProps> = () => {
  const dispatch = useDispatch();

  const FileActions = {
    Open: () => {
      dispatch({ type: FileSystemActions.OPEN_FILE_SYSTEM });
      dispatch({ type: MenuActions.CLOSE_ALL });
    },
  };

  return (
    <MenuItem menuName="File" menuType={MenuType.file} offset={'0px'}>
      {/* <DropdownMenuItem>New</DropdownMenuItem> */}
      {/* <DropdownMenuItem>New Window</DropdownMenuItem> */}
      <DropdownMenuItem onClick={FileActions.Open}>Open...</DropdownMenuItem>
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
