import React, { FC } from "react";
import styled from "styled-components";

interface StatusBarProps {}

const StatusBarContainer = styled.div`
  border-top: var(--border);
  height: 21px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  background-color: #222;
  font-size: 12px;
`;

const StatusBarElement = styled.div`
  border-left: var(--border);
  padding-left: 7px;
  height: 100%;
  display: flex;
  align-items: center;
`;

const Encoding = styled(StatusBarElement)`
  padding-right: 83px;
`;
const LineBreak = styled(StatusBarElement)`
  padding-right: 66px;
`;
const FontSize = styled(StatusBarElement)`
  padding-right: 20px;
`;
const Index = styled(StatusBarElement)`
  padding-right: 103px;
`;

const StatusBar: FC<StatusBarProps> = () => {
  return (
    <StatusBarContainer>
      <Encoding>UTF-8</Encoding>
      <LineBreak>UNIX (LF)</LineBreak>
      <FontSize>20px</FontSize>
      <Index>Idx 10</Index>
    </StatusBarContainer>
  );
};

export default StatusBar;
