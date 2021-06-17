import styled from "styled-components";

export const DropdownMenu = styled.div<any>`
  user-select: none;
  cursor: default;
  position: absolute;
  top: 19px;
  left: ${(props: any) => props.offset ?? "0"};
  border: 1px solid #4b4c4f;
  background-color: #292a2d;
  border-radius: 1px;
`;

export const DropdownMenuItem = styled.div`
  color: #cccccc;
  min-width: 200px;
  padding-left: 25px;
  padding-top: 1px;
  padding-bottom: 1px;
  margin: 1px;
  font-size: 13px;
  &:hover {
    background-color: #4b4c4f;
  }
`;

export const DropdownMenuSeperator = styled.div`
  border-bottom: solid 1px #616162;
  margin-left: 25px;
  margin-right: 2px;
  margin-top: 2px;
  margin-bottom: 2px;
`;