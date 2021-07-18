import styled from 'styled-components';

export const FileSystemContainer = styled.div`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -20%);
  width: 900px;
  height: 500px;
  display: flex;
  flex-direction: column;
  border: 1px solid #262626;
  /* resize: vertical; */
`;

export const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HandleContainer = styled.div`
  height: 29px;
  width: 100%;
  background-color: #000000;
  display: flex;
  align-items: center;
`;

export const Title = styled.div`
  font-size: 12px;
  user-select: none;
`;

export const Handle = styled.div.attrs((props: any) => ({
  id: 'handle',
}))`
  width: 100%;
  background-color: black;
  height: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
`;

export const XButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  width: 46px;
  height: 28px;
  transition: background-color 0.18s ease-out;
  &:hover {
    transition: background-color 0.05s ease-out;
    background-color: #e81123;
  }
  &:active {
    background-color: #8b0a14;
  }
`;

export const Taskbar = styled.div`
  width: 100%;
  height: 35px;
  border-bottom: 1px solid white;
  background-color: #191919;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding-right: 15px;
`;

export const PathContainer = styled.div`
  background-color: #191919;
  border: 0.5px solid #535353;
  user-select: none;
  width: 100%;
  height: 25px;
  padding-left: 15px;
  font-size: 13px;
  display: flex;
  align-items: center;
`;

export const StorageCapacity = styled.div`
  background-color: #191919;
  color: #dedede;
  user-select: none;
  border: 0.7px solid #535353;
  width: 200px;
  height: 25px;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const StorageCapacityFillBar = styled.div<any>`
  position: absolute;
  top: 0px;
  left: 0;
  height: 24px;
  width: ${(props: any) => {
    return `${(props.memory / 1000) * 100}%`; 
  }};
  background-color: #5b72ffb0;
  z-index: 99;
  transition: width 1s ease-in-out;
`;

export const StorageCapacityText = styled.div`
  z-index: 100;
`;

export const Container = styled.div`
  display: flex;
  height: 100%;
`;

export const Sidebar = styled.div`
  width: 40px;
  height: 100%;
  background-color: #191919;
  border-right: 1px solid #131313;
`;

export const ViewContainer = styled.div`
  padding-left: 15px;
  /* padding-right: 15px; */
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 400px;
  background-color: #202020;
  border-left: 1px solid #2b2b2b;
`;

export const View = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: flex-start;
  width: 100%;
  overflow-y: scroll;
  padding-right: 15px;
  height: 100%;
  ::-webkit-scrollbar-button {
    height: 9px;
  }
`;

export const StatusBar = styled.div`
  width: 100%;
  height: 17px;
  background-color: #333333;
`;

export const ArrowsContainer = styled.div`
  height: 100%;
  display: flex;
`;

export const ArrowButton = styled.div`
  user-select: none;
  cursor: default;
  width: 45px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FSObject = styled.div<any>`
  height: 22px;
  width: 100%;
  user-select: none;
  padding-left: 7px;
  padding-right: 7px;
  font-size: 14px;
  cursor: default;
  background-color: ${(props: any) => props.isSelected && '#777777'};
  &:hover {
    background-color: ${(props: any) => (props.isSelected ? '#777777' : '#4d4d4d')};
  }
  &:active {
    background-color: #777777;
  }
  display: grid;
  grid-template-columns: 25px 4fr 4fr 3fr 2fr;
  grid-template-rows: 1fr;
  align-items: center;
`;

export const HeaderContainer = styled(FSObject)`
  color: #dedede;
  margin-bottom: 8px;
  &:hover {
    background-color: inherit;
  }
`;

export const HeaderName = styled.div`
  padding-top: 2px;
  margin-left: -3px;
  height: 100%;
`;
export const HeaderSize = styled.div`
  padding-top: 2px;
  height: 100%;
  padding-left: 7px;
  border-left: 0.5px solid white;
`;
export const HeaderDateMod = styled.div`
  padding-top: 2px;
  height: 100%;
  padding-left: 7px;
  border-left: 0.5px solid white;
`;
export const HeaderExt = styled.div`
  padding-top: 2px;
  height: 100%;
  padding-left: 7px;
  border-left: 0.5px solid white;
`;

export const FileContainer = styled(FSObject)``;

export const FileName = styled.div``;
export const FileSize = styled.div`
  display: flex;
  justify-content: flex-end;
  color: #dedede;
  padding-left: 7px;
`;
export const FileDateMod = styled.div`
  color: #dedede;
  padding-left: 7px;
`;
export const FileExt = styled.div`
  color: #dedede;
  padding-left: 7px;
`;

export const FolderContainer = styled(FSObject)``;
export const CreateNewFolderContainer = styled(FolderContainer)`
  background-color: #777777;
  &:hover {
    background-color: #777777;
  }
`;

export const FolderName = styled.div``;
export const FolderSize = styled.div`
  display: flex;
  justify-content: flex-end;
  color: #dedede;
  padding-left: 7px;
`;
export const FolderDateMod = styled.div`
  color: #dedede;
  padding-left: 7px;
`;
export const FolderType = styled.div`
  color: #dedede;
  padding-left: 7px;
`;

export const Controller = styled.div`
  background-color: #383838;
  display: flex;
  width: 100%;
  padding: 10px 15px;
`;

export const ButtonContainer = styled.div`
  margin-left: auto;
  display: flex;
  gap: 13px;
`;

// 174 × 51 --? 85 x 25

export const Button = styled.div`
  user-select: none;
  cursor: default;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 88px;
  height: 26px;
  border: 1px solid white;
  font-size: 12px;
  background-color: #383838;
  &:hover {
    background-color: #454545;
  }
  &:active {
    background-color: #666666;
  }
`;
