import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Form, { H1 } from "./components/Form/Form";
import Main from "./components/Main/Main";
import { signInUser } from "./store/User/User.actions";
export const API_URL = "http://localhost:1337";
export const primaryColor = "rgb(0, 101, 109)";

export const MainWrapper = styled.div`
  height: 100vh;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  background: ${primaryColor};
  background: linear-gradient(
    90deg,
    rgba(0, 101, 109, 0.9023984593837535) 22%,
    rgba(0, 109, 95, 0.9220063025210083) 74%
  );
`;

function App() {
  const { signedIn } = useSelector((state) => ({
    signedIn: state.user.signedIn,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem("SIGNED_IN");
    if (user) {
      dispatch(signInUser(JSON.parse(user)));
    } else {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainWrapper>
      <H1>Welcome to Simon's super duper chat room!</H1>

      {signedIn ? <Main /> : <Form />}
    </MainWrapper>
  );
}

export default App;
