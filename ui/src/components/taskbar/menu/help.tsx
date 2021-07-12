import React, { FC } from "react";
import { Menu } from "../redux";
import { DropdownMenuItem, DropdownMenuSeperator } from "./components/dropdown";
import MenuItem from "./components/menu-item";

interface HelpProps {}

const Help: FC<HelpProps> = () => {
  return (
    <MenuItem menuName="Help" menuType={Menu.Type.help} offset={"194px"}>
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

export default Help;
