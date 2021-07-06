import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import PositionSquare from './position-square';
import {
  ReduxPaneContainer,
  PaneTitleBar,
  PaneTitleBarLeft,
  PaneTitleBarCenter,
  PaneTitleBarRight,
  Button,
  StateContainer,
  Pre,
  SideFold,
  RoundedBar,
  SettingsBox,
  Setting,
  SettingsButton,
  SettingsButtonContainer,
} from './redux-pane-components';

export enum FloatPosition {
  TOP_RIGHT,
  BOTTOM_RIGHT,
  BOTTOM_LEFT,
  TOP_LEFT,
}

// Local Storage Function
const getInitialReduxPaneState = () => {
  let initialFloatPosition: string | null | number = parseInt(
    localStorage.getItem('__initialFloatPosition') as string
  );
  let initialShow: string | null | boolean =
    (localStorage.getItem('__initialShow') ?? 'true') === 'true';
  let initialMaxHeight: string | null | number = parseInt(
    localStorage.getItem('__initialMaxHeight') as string
  );

  if (isNaN(initialFloatPosition)) {
    localStorage.setItem('__initialFloatPosition', '0');
    initialFloatPosition = 0;
  }
  if (initialShow === null) {
    localStorage.setItem('__initialShow', 'true');
    initialShow = true;
  }
  if (isNaN(initialMaxHeight)) {
    localStorage.setItem('__initialMaxHeight', '50');
    initialMaxHeight = 50;
  }

  return [initialFloatPosition, initialShow, initialMaxHeight];
};

const ReduxPane: FC = () => {
  const state: any = useSelector((state) => state);

  const [initialFloatPosition, initialShow, initialMaxHeight] = getInitialReduxPaneState();

  const [floatPosition, setFloatPosition] = useState<number>(initialFloatPosition as number);
  const [maxHeight, setMaxHeight] = useState(initialMaxHeight as number);
  const [show, setShow] = useState<boolean>(initialShow as boolean);

  const [settings, setSettings] = useState<boolean>(false);

  const handleReduxShow = () => {
    setShow(!show);
    localStorage.setItem('__initialShow', `${!show}`);
  };

  const handleMovePane = (position: FloatPosition) => {
    setFloatPosition(position);
    setSettings(false);
    localStorage.setItem('__initialFloatPosition', `${position}`);
  };

  const handleSettingsButtonClick = (change: string) => {
    if (change === '+') {
      let newMaxHeight = maxHeight + 10;
      newMaxHeight = newMaxHeight > 95 ? 95 : newMaxHeight;
      setMaxHeight(newMaxHeight);
      localStorage.setItem('__initialMaxHeight', `${newMaxHeight}`);
    } else {
      let newMaxHeight = maxHeight - 10;
      newMaxHeight = newMaxHeight < 10 ? 10 : newMaxHeight;
      setMaxHeight(newMaxHeight);
      localStorage.setItem('__initialMaxHeight', `${newMaxHeight}`);
    }
  };

  const handleSettings = () => setSettings(!settings);

  return (
    <>
      <ReduxPaneContainer show={show} floatPosition={floatPosition} maxHeight={maxHeight}>
        {show ? (
          <>
            <PaneTitleBar>
              <PaneTitleBarLeft />
              <PaneTitleBarCenter>Redux</PaneTitleBarCenter>
              <PaneTitleBarRight>
                <Button onClick={handleSettings}>⚙</Button>
                <Button onClick={handleReduxShow}>{floatPosition > 1 ? '⬅' : '➡'}</Button>
              </PaneTitleBarRight>
            </PaneTitleBar>
            {settings && (
              <SettingsBox>
                <Setting>
                  Position
                  <PositionSquare
                    position={FloatPosition.TOP_RIGHT}
                    currentPosition={floatPosition}
                    onClick={() => handleMovePane(FloatPosition.TOP_RIGHT)}
                  />
                  <PositionSquare
                    position={FloatPosition.BOTTOM_RIGHT}
                    currentPosition={floatPosition}
                    onClick={() => handleMovePane(FloatPosition.BOTTOM_RIGHT)}
                  />
                  <PositionSquare
                    position={FloatPosition.BOTTOM_LEFT}
                    currentPosition={floatPosition}
                    onClick={() => handleMovePane(FloatPosition.BOTTOM_LEFT)}
                  />
                  <PositionSquare
                    position={FloatPosition.TOP_LEFT}
                    currentPosition={floatPosition}
                    onClick={() => handleMovePane(FloatPosition.TOP_LEFT)}
                  />
                </Setting>
                <Setting>
                  Max Height
                  <SettingsButtonContainer>
                    <SettingsButton onClick={() => handleSettingsButtonClick('+')}>
                      +
                    </SettingsButton>
                    <SettingsButton onClick={() => handleSettingsButtonClick('-')}>
                      -
                    </SettingsButton>
                  </SettingsButtonContainer>
                </Setting>
              </SettingsBox>
            )}
            <StateContainer>
              <Pre>
                <code>{JSON.stringify(state, null, 2)}</code>
              </Pre>
            </StateContainer>
          </>
        ) : (
          <SideFold onClick={handleReduxShow} floatPosition={floatPosition}>
            <RoundedBar />
          </SideFold>
        )}
      </ReduxPaneContainer>
    </>
  );
};

export default ReduxPane;
