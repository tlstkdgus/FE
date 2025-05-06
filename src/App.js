import React from "react";
import RouterComponent from "./router";
import { GlobalStyle } from "./styles/GlobalStyle";
import styled from "styled-components";
import Mobile from "./styles/Mobile";

const Container = styled.div`
  height: 100%;
  background-position: center;
  background-size: cover;
  background-color: aliceblue;
  background-attachment: fixed;
`;

function App() {
  return (
    <Container>
      <GlobalStyle />
      <Mobile>
        <RouterComponent />
      </Mobile>
    </Container>
  );
}

export default App;
