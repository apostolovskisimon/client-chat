import React from "react";
import styled from "styled-components";
import { ChatList } from "../ChatList/ChatList";
import Users from "../Users/Users";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export default function Main() {
  return (
    <Wrapper>
      <ChatList />
      <Users />
    </Wrapper>
  );
}
