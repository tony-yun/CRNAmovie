import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import {
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  ScrollView,
  View,
} from "react-native";
import Slide from "../components/Slide";
import { API_KEY } from "@env";
import Poster from "../components/Poster";

const Movies = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);

  const getTrending = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
      )
    ).json();
    setTrending(results);
  };
  const getUpcoming = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`
      )
    ).json();
    setUpcoming(results);
  };

  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
      )
    ).json();
    setNowPlaying(results);
  };

  const getData = async () => {
    Promise.all([getTrending(), getUpcoming(), getNowPlaying()]);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await getData();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Swiper
        horizontal
        loop
        showsButtons={false}
        autoplay
        autoplayTimeout={10}
        showsPagination={false}
        containerStyle={{
          width: "100%",
          height: SCREEN_HEIGHT / 4,
          marginBottom: 20,
        }}
      >
        {nowPlaying.map((movie) => (
          <Slide
            key={movie.id}
            backdropPath={movie.backdrop_path}
            posterPath={movie.poster_path}
            originalTitle={movie.original_title}
            voteAverage={movie.vote_average}
            overview={movie.overview}
          />
        ))}
      </Swiper>

      <View style={{ marginBottom: 20 }}>
        <ListTitle>Trending Movies</ListTitle>
        <ScrollView
          contentContainerStyle={{ paddingLeft: 20, marginTop: 20 }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {trending.map((movie) => (
            //{trending.reverse().map((movie) =>( //reverse???????????? ???????????? ?????????
            <View
              key={movie.id}
              style={{ marginRight: 20, alignItems: "center" }}
            >
              <Poster path={movie.poster_path} />
              <Title>
                {movie.original_title.slice(0, 13)}
                {movie.original_title.length > 13 ? "..." : null}
              </Title>
              <Votes>
                {movie.vote_average > 0
                  ? `??????${movie.vote_average.toFixed(1)} / 10`
                  : `Coming soon`}
              </Votes>
              {/* ?????? ?????? ?????? */}
              {/* {movie.vote_average > 0 ? (
                <Votes>??????{movie.vote_average.toFixed(1)} / 10</Votes>
              ) : null} */}
            </View>
          ))}
        </ScrollView>
      </View>

      <ComingSoonTitle>Coming Soon</ComingSoonTitle>
      {/* upcoming.map((movie) => {} <- ?????? ???????????? ?????? ???????????? ???????????????. */}
      {upcoming.map((movie) => (
        <HMovie key={movie.id}>
          <Poster path={movie.poster_path} />
          <HColumn>
            <Title>{movie.original_title}</Title>
            <Release>
              {new Date(movie.release_date).toLocaleDateString("ko", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              {/* .toLocaleDateString("ko")??? "ko"??? ????????? ?????? ??????,"en"??? ?????? */}
              {/* (?????? API)"2022-08-05" -> (.toLacaleDateString("ko") "2022.08.05.")  */}
              {/* "ko"?????? {}????????? ???????????? -> "2022??? 8??? 5???" */}
            </Release>
            <Overview>
              {movie.overview !== "" && movie.overview.length > 140
                ? `${movie.overview.slice(0, 140)}...`
                : movie.overview}
              {movie.overview === "" ? "Coming soon" : null}
            </Overview>
          </HColumn>
        </HMovie>
      ))}
    </ScrollView>
  );
};

export default Movies;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const ListTitle = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 16px;
  font-weight: 600;
  margin-left: 20px;
`;
const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 16px;
  font-weight: 600;
  margin: 5px 0 5px 0;
`;
const Votes = styled.Text`
  color: ${(props) => props.theme.textColor};
`;
const HMovie = styled.View`
  padding: 0 30px;
  flex-direction: row;
  margin-bottom: 30px;
`;
const HColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;
const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  width: 80%;
`;
//????????? ????????? ????????? ?????????.
//1. rgba(255,255,255,0.8) ????????? rgba??????.
//2. color:white ?????? opacity:0.8??? ??????.
const Release = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin: 10px 0;
`;
const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 20px;
`;
