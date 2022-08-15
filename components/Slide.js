import React from "react";
import { StyleSheet, View, Image } from "react-native";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";
import Poster from "./Poster";

const Slide = ({
  backdropPath,
  posterPath,
  originalTitle,
  voteAverage,
  overview,
}) => {
  return (
    <View style={{ flex: 1 }}>
      <Image
        style={StyleSheet.absoluteFill}
        // StyleSheet.absoluteFill로 width:100%,height:100%,position:absolute한번에 대체
        source={{ uri: makeImgPath(backdropPath) }}
        blurRadius={6}
      />
      <Wrapper>
        <Poster path={posterPath} />
        <Column>
          <Title>{originalTitle}</Title>
          {voteAverage > 0 ? <Votes>⭐️{voteAverage}/10</Votes> : null}
          <Overview>{overview.slice(0, 100)}...</Overview>
        </Column>
      </Wrapper>
    </View>
  );
};

export default Slide;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.textColor};
`;
const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  width: 90%;
  margin: 0 auto;
  justify-content: space-around;
  align-items: center;
`;
const Column = styled.View`
  width: 60%;
`;
const Overview = styled.Text`
  margin-top: 10px;
  color: ${(props) => props.theme.textColor};
`;
const Votes = styled(Overview)`
  font-size: 12px;
`;
