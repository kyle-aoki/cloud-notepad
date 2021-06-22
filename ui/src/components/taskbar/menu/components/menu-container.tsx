import styled from 'styled-components';

const MenuContainer = styled.div<any>`
  height: 100%;
  padding: 0 4px;
  font-size: 12px;
  display: flex;
  align-items: center;
  cursor: default;

  border-radius: 1px;

  border: 1px solid ${(props: any) => (props.isSelected ? '#505050' : 'transparent')};
  background-color: ${(props: any) => props.isSelected && '#606060'};

  &:hover {
    border: 1px solid ${(props: any) => (props.isSelected ? '#505050' : '#404040')};
    background-color: ${(props: any) => (props.isSelected ? '#606060' : '#505050')};
  }
`;

export default MenuContainer;
