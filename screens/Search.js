import React from "react";
import styled from "styled-components/native";

const Search = () => (
  <Btn>
    <Title>Search</Title>
  </Btn>
);
export default Search;

const Btn = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
`;
