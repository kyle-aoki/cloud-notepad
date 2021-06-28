import { FC } from 'react';
import styled from 'styled-components';
import { FloatPosition } from './redux-pane';

const SettingsMenuButton = styled.div<{
  position: FloatPosition;
  currentPosition: FloatPosition;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  background-color: ${(props) => props.currentPosition === props.position && '#505050'};
  &:hover {
    background-color: #505050;
  }
  &:active {
    background-color: ${(props) => props.currentPosition !== props.position && '#606060'};
  }
`;

const Square = styled.div<{ position: number }>`
  width: 15px;
  height: 15px;
  background-color: #2f74c0;
  display: flex;
  justify-content: ${(props) =>
    props.position === FloatPosition.BOTTOM_LEFT || props.position === FloatPosition.TOP_LEFT
      ? 'flex-start'
      : 'flex-end'};
  align-items: ${(props) =>
    props.position === FloatPosition.TOP_RIGHT || props.position === FloatPosition.TOP_LEFT
      ? 'flex-start'
      : 'flex-end'};
`;

const Position = styled.div`
  width: 7px;
  height: 7px;
  background-color: #ffffff;
`;

const PositionSquare: FC<{
  position: number;
  onClick: VoidFunction;
  currentPosition: FloatPosition;
}> = ({ position, onClick, currentPosition }) => {
  return (
    <SettingsMenuButton onClick={onClick} position={position} currentPosition={currentPosition}>
      <Square position={position}>
        <Position />
      </Square>
    </SettingsMenuButton>
  );
};

export default PositionSquare;
