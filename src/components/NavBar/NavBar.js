import React from "react";

import styled from "styled-components";

const NavBar = () => {
  return (
    <Nav>
      <H1>Movie App</H1>
    </Nav>
  );
};

export default NavBar;

const Nav = styled.div`
  padding: 10px 10%;
  border-bottom: 1px solid #cccccc;
`;
const H1 = styled.div``;
