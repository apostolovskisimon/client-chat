import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { signInUser } from "../../store/User/User.actions";

export const FormWrapper = styled.div`
  height: 45%;
  width: 32%;
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid white;
  border-radius: 15px;
  flex-direction: column;
`;

export const H1 = styled.h1`
  font-size: 2rem;
  color: ${(props) => props.color || "white"};
  text-align: center;
  padding-top: 50px;
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
`;

export const FormCont = styled.form`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 100%;
  margin-top: 30px;
`;

export const Avatar = styled.img`
  height: 150px;
  width: 150px;
  cursor: pointer;

  :hover {
    opacity: 0.5;
  }
`;

export const Input = styled.input`
  margin-top: 12px;
  height: 40px;
  width: 100%;
  border: none;
  border-radius: 15px;
  font-size: 1.5rem;
  text-indent: 15px;
`;

export const SubmitBtn = styled.button`
  min-width: 30%;
  padding: 12px;
  height: 50px;
  background: rgb(0, 101, 109);
  color: white;
  border: none;
  border-radius: 15px;
  margin: 20px auto;
  font-size: 1.2rem;
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;

export const Label = styled.label`
  color: white;
  font-size: 1.2rem;
`;

export default function Form() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim().length >= 2) {
      dispatch(signInUser(name));
    } else {
      alert("Your name must be 2 chars long");
    }
  };

  return (
    <FormWrapper>
      <Avatar
        src="http://lionhallattorneys.com.ng/wp-content/uploads/2015/12/empty-profile.png"
        alt=""
      />
      <FormCont onSubmit={handleSubmit}>
        <Label htmlFor="name">Your Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          minLength={2}
        />
        <SubmitBtn type="submit">ENTER CHAT</SubmitBtn>
      </FormCont>
    </FormWrapper>
  );
}
