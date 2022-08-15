import React from "react";
import styled from "styled-components/native";

const Tv = () => (
  <Btn>
    <Title>Tv</Title>
  </Btn>
);
export default Tv;

const Btn = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
`;
