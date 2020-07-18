import React from "react";

import styled from "styled-components";
import { useHistory } from "react-router-dom";

const NavBar = () => {
  const history = useHistory();
  return (
    <Nav>
      <H1 onClick={() => history.push("/")}>Movie App</H1>
    </Nav>
  );
};

export default NavBar;

const Nav = styled.div`
  height: 6vh;
  line-height: 6vh;
  padding: 0 10%;
  border-bottom: 1px solid #cccccc;
`;
const H1 = styled.div`
  cursor: pointer;
`;
