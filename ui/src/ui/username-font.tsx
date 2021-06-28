import { FC } from 'react';
import styled from 'styled-components';

export const UsernameFont = styled.span`
  display: grid;
  place-items: center;
  font-family: 'Consolas';
  font-size: 14px;
  background-color: #658eff;
  color: white;
  border-radius: 3px;
  margin-left: 7px;
  padding: 2px 5px;
`;

interface UsernameDisplayProps {
  username: string;
}

export const UsernameDisplay: FC<UsernameDisplayProps> = ({ username }) => {
  return <UsernameFont>{username}</UsernameFont>;
};

const Text = styled.div``;

const InlineText = styled.div`
  display: flex;
  align-items: center;
`;

export const LoggedInAs: FC<UsernameDisplayProps> = ({ username }) => {
  return (
    <InlineText>
      <Text>Logged in as</Text>
      <UsernameDisplay username={username} />
    </InlineText>
  );
};
