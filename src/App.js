import React from "react";
import RouterComponent from "./router";
import { GlobalStyle } from "./styles/GlobalStyle";
import styled from "styled-components";
import Mobile from "./styles/Mobile";
import { BrowserRouter } from "react-router-dom";
import { ScheduleProvider } from "./context/ScheduleContext";

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
      <BrowserRouter>
        <ScheduleProvider>
          <Mobile>
            <RouterComponent />
          </Mobile>
        </ScheduleProvider>
      </BrowserRouter>
    </Container>
  );
}

export default App;
