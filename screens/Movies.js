import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";

const Movies = () => (
  <Btn>
    <Title>Movies</Title>
  </Btn>
);
export default Movies;

const Btn = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
`;
