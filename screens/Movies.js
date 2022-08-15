import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { ActivityIndicator, Dimensions, Image, StyleSheet } from "react-native";
import { makeImgPath } from "../utils";

const Movies = () => {
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
      )
    ).json();
    setNowPlaying(results);
    setLoading(false);
  };
  useEffect(() => {
    getNowPlaying();
  }, []);
  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Container>
      <Swiper
        horizontal
        loop
        showsButtons={false}
        autoplay
        autoplayTimeout={10}
        showsPagination={false}
        containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
      >
        {nowPlaying.map((movie) => (
          <View key={movie.id}>
            <Image
              style={StyleSheet.absoluteFill}
              // StyleSheet.absoluteFill로 width:100%,height:100%,position:absolute한번에 대체
              source={{ uri: makeImgPath(movie.backdrop_path) }}
              blurRadius={6}
            />
            <Wrapper>
              <Poster source={{ uri: makeImgPath(movie.poster_path) }} />
              <Column>
                <Title>{movie.original_title}</Title>
                {movie.vote_average > 0 ? (
                  <Votes>⭐️{movie.vote_average}/10</Votes>
                ) : null}
                <Overview>{movie.overview.slice(0, 90)}...</Overview>
              </Column>
            </Wrapper>
          </View>
        ))}
      </Swiper>
    </Container>
  );
};

export default Movies;

const API_KEY = "a3335955f6b64a441443225e3776ef80";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Container = styled.ScrollView``;
const View = styled.View`
  flex: 1;
`;
const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
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
const Poster = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
`;
