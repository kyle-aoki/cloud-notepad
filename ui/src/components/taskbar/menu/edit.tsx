import React, { FC } from "react";
import { MenuType } from "../../../redux/reducers/menu/reducer";
import { DropdownMenuItem, DropdownMenuSeperator } from "./components/dropdown";
import MenuItem from "./components/menu-item";

interface EditProps {}

const Edit: FC<EditProps> = () => {
  return (
    <MenuItem menuName="Edit" menuType={MenuType.edit} offset={"28px"}>
      <DropdownMenuItem>New</DropdownMenuItem>
      <DropdownMenuItem>New Window</DropdownMenuItem>
      <DropdownMenuItem>Open...</DropdownMenuItem>
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

export default Edit;
