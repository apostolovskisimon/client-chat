import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import styled from "styled-components";
import { API_URL } from "../../App";
import { userType } from "../../types";

export const Chat = styled.div`
  background-color: white;
  height: 40em;
  width: 60%;
  border-radius: 15px;
  margin: 30px auto;
  position: relative;
`;

export const ChatInputCont = styled.form`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 42px;
  position: absolute;
  bottom: 0;
  left: 0;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;

export const ChatInput = styled.input`
  height: 100%;
  width: 80%;
  border: none;
  background-color: black;
  text-indent: 15px;
  font-size: 1.5rem;
  color: white;
  ::placeholder {
    color: white;
  }
`;

export const ChatBtn = styled.button`
  width: 20%;
  height: 100%;
  background-color: purple;
  color: white;
  font-weight: bold;
  border: none;
  font-size: 1.5rem;
`;

export const Messages = styled.div`
  padding: 15px;
  padding-top: 50px;
  height: 90%;
  width: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
`;

export const MessageWrapper = styled.div`
  min-height: 75px;
  min-width: 20%;
  max-width: 44%;
  font-size: 1.2rem;
  margin-bottom: 40px;
  position: relative;
  align-self: ${(props) => (props.isAuthor ? "flex-end" : "flex-start")};
`;

export const Message = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${(props) => (props.isAuthor ? "lightblue" : "lightgreen")};
  display: flex;
  flex-direction: ${(props) => (props.isAuthor ? "row-reverse" : "row")};
  justify-content: space-between;
  align-items: flex-end;
  border-radius: 15px;
  padding: 10px;
`;

export const MessageText = styled.p`
  width: 100%;
  min-height: 100%;
  font-size: 1.3rem;
  word-wrap: break-word;
`;

export const Author = styled.p`
  font-size: 0.9rem;
  margin-left: 10px;
  color: palevioletred;
`;

export const MessageDate = styled.p`
  color: lightpink;
  font-size: 0.8rem;
`;

export const MsgHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 30px;
  align-items: center;
`;

export const ChatList = () => {
  const { user } = useSelector((state) => ({
    user: state.user.user,
  }));

  const { name, id } = user;

  const [msg, setMsg] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  const socket = io(API_URL);
  const messageRef = useRef();

  const handleMsgSubmit = (e) => {
    e.preventDefault();
    const dateNow = new Date().toLocaleString();
    const message = { msg, name, id, dateNow };
    socket.emit("message", message);
    setMsg("");
  };

  useEffect(() => {
    socket.emit("receive prev messages");
    socket.once("received messages", (all) => {
      setAllMessages(all);
    });

    socket.on("all messages", (allMsg) => {
      console.log("all messages", allMsg);
      setAllMessages(allMsg);
      console.log(messageRef);
      messageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Chat>
      <Messages>
        {allMessages.map((message, i) => {
          const isAuthor = message.id === id;
          return (
            <MessageWrapper isAuthor={isAuthor}>
              <MsgHeader>
                <MessageDate>
                  {message.dateNow.split(",")[1].trim().slice(0, 8)}
                </MessageDate>
                <Author isAuthor={isAuthor}>
                  {isAuthor ? "Me" : message.name}
                </Author>
              </MsgHeader>
              <Message key={i} ref={messageRef} isAuthor={isAuthor}>
                <MessageText>{message.msg}</MessageText>
              </Message>
            </MessageWrapper>
          );
        })}
      </Messages>
      <ChatInputCont onSubmit={handleMsgSubmit}>
        <ChatInput
          placeholder="Your message"
          value={msg}
          onChange={(e) => setMsg(e.currentTarget.value)}
        />
        <ChatBtn>SEND</ChatBtn>
      </ChatInputCont>
    </Chat>
  );
};
