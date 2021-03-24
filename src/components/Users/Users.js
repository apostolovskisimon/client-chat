import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import styled from "styled-components";
import { API_URL } from "../../App";

export const UserWrapper = styled.div`
  padding-right: 100px;
`;

const Users = () => {
  const socket = io(API_URL);

  const { user } = useSelector((state) => ({
    user: state.user.user,
  }));

  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    socket.emit("new user", user);
    socket.on("active users", (users) => {
      setActiveUsers(users);
    });

    return () => {
      //   socket.emit("user left", user.id);
      socket.disconnect(user.id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserWrapper>
      Online users:{" "}
      {activeUsers.map((el) => (
        <p>{el.name}</p>
      ))}
    </UserWrapper>
  );
};

export default Users;
