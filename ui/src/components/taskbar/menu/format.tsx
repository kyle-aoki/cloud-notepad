import React, { FC } from "react";
import { Menu } from "../redux";
import { DropdownMenuItem, DropdownMenuSeperator } from "./components/dropdown";
import MenuItem from "./components/menu-item";

interface FormatProps {}

const Format: FC<FormatProps> = () => {
  return (
    <MenuItem menuName="Format" menuType={Menu.Type.format} offset={"112px"}>
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

export default Format;
