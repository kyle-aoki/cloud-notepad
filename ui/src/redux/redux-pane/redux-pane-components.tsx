import styled from 'styled-components';
import { FloatPosition } from './redux-pane';

export const ReduxPaneContainer = styled.div<{
  show: boolean;
  floatPosition: FloatPosition;
  maxHeight: number;
}>`
  z-index: 1000;
  background-color: black;
  color: white;
  border: 1px solid white;
  position: fixed;
  box-shadow: 3px 3px 8px 2px rgba(0, 0, 0, 0.4);
  font-size: 14px;

  top: ${(props) => {
    switch (props.floatPosition) {
      case FloatPosition.TOP_RIGHT:
        return '20px';
      case FloatPosition.BOTTOM_RIGHT:
        return 'auto';
      case FloatPosition.BOTTOM_LEFT:
        return 'auto';
      case FloatPosition.TOP_LEFT:
        return '20px';
    }
  }};
  right: ${(props) => {
    switch (props.floatPosition) {
      case FloatPosition.TOP_RIGHT:
        return '20px';
      case FloatPosition.BOTTOM_RIGHT:
        return '20px';
      case FloatPosition.BOTTOM_LEFT:
        return 'auto';
      case FloatPosition.TOP_LEFT:
        return 'auto';
    }
  }};
  bottom: ${(props) => {
    switch (props.floatPosition) {
      case FloatPosition.TOP_RIGHT:
        return 'auto';
      case FloatPosition.BOTTOM_RIGHT:
        return '20px';
      case FloatPosition.BOTTOM_LEFT:
        return '20px';
      case FloatPosition.TOP_LEFT:
        return 'auto';
    }
  }};
  left: ${(props) => {
    switch (props.floatPosition) {
      case FloatPosition.TOP_RIGHT:
        return 'auto';
      case FloatPosition.BOTTOM_RIGHT:
        return 'auto';
      case FloatPosition.BOTTOM_LEFT:
        return '20px';
      case FloatPosition.TOP_LEFT:
        return '20px';
    }
  }};

  min-width: 300px;
  max-width: 500px;
  max-height: ${(props) => props.maxHeight.toString() + '%'};
  border-radius: 2px;

  transform: ${(props) => {
    if (props.floatPosition === 0 || props.floatPosition === 1) {
      return props.show ? '' : 'translateX(100%)';
    }
    return props.show ? '' : 'translateX(-100%)';
  }};

  display: flex;
  flex-direction: column;
`;

export const PaneTitleBar = styled.div`
  height: 30px;
  font-family: 'Consolas';
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  border-bottom: 1px solid white;
  font-size: 16px;
`;

export const PaneTitleBarLeft = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const PaneTitleBarRight = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const PaneTitleBarCenter = styled.div`
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StateContainer = styled.div`
  display: flex;
  height: 100%;
  background-color: #121212;
  padding: 0 20px;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 14px;
  }

  ::-webkit-scrollbar-track {
    background: #141414;
  }

  ::-webkit-scrollbar-thumb {
    background: #353535;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #505050;
  }
`;

export const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 35px;
  padding: 0 10px;
  height: 100%;
  user-select: none;
  &:hover {
    background-color: #303030;
  }
  &:active {
    background-color: #505050;
  }
`;

export const SideFold = styled.div<{ floatPosition: FloatPosition }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  width: 20px;
  user-select: none;
  &:hover {
    background-color: #303030;
  }
  &:active {
    background-color: #505050;
  }
  margin-left: ${(props) => (props.floatPosition > 1 ? 'auto' : '0')};
`;

export const RoundedBar = styled.div`
  height: 120px;
  width: 3px;
  border-radius: 4px;
  background-color: white;
`;

export const Pre = styled.pre`
  height: 100%;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  word-wrap: break-word;
`;

export const SettingsBox = styled.div`
  position: absolute;
  top: 29px;
  right: 35px;
  background-color: #242424;
  border: 1px solid white;
  padding: 5px 0;
  font-family: 'Consolas';
`;

export const Setting = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  user-select: none;
  padding: 5px 15px;
`;

export const SettingsButtonContainer = styled.div`
  display: flex;
  margin-left: auto;
`;

export const SettingsButton = styled.div`
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  &:hover {
    background-color: #505050;
  }
  &:active {
    background-color: #606060;
  }
`;
