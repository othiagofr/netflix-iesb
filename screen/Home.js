import React, { useState, useEffect } from 'react';

import { StatusBar, Dimensions, PermissionsAndroid } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import styled from 'styled-components/native';

import Header from '../components/Header';
import Hero from '../components/Hero';
import Movies from '../components/Movies';
import { getLocation, filterByCountry } from '../services/movieFilter';
import AppContext from '../AppContext';
import { translate } from '../languages/utils';

const api = [
  require('../assets/movies/movie1.jpg'),
  require('../assets/movies/movie2.jpg'),
  require('../assets/movies/movie3.jpg'),
  require('../assets/movies/movie4.jpg'),
];

const Container = styled.ScrollView`
  flex: 1;
  background-color: #000;
`;

const Poster = styled.ImageBackground`
  width: 100%;
  height: ${(Dimensions.get('window').height * 81) / 100}px;
`;

const Gradient = styled(LinearGradient)`
  height: 100%;
`;

const Home = () => {

  const [movies, setMovies] = useState([]);
  const [nationalMovies, setNationalMovies] = useState([]);
  const [position, setPosition] = useState(null)

  useEffect(() => {
    const obtainLocation = async () => {
      try {

        const result = await getLocation();
        setPosition(result)

      } catch (error) {
        console.log("obtainLocation Error", error);
      }
    }

    obtainLocation();

  }, []);

  useEffect(() => {
    const loadingMovies = async () => {

      const moviesJson = require('../assets/Movies.json');
      const nationalCountries = []

      try {
        if (position !== null) {
          nationalCountries.push(...await filterByCountry(moviesJson, position));
          setNationalMovies(nationalCountries);
        }
      } catch (error) {
        console.log("FilterByCountry error", error)
      }

      const nationalCountriesTitles = nationalCountries.map(
        (item) => item.Title
      );

      const moviesWithoutNationals = moviesJson.filter((item) =>
        !nationalCountriesTitles.includes(item.Title)
      )

      setMovies(moviesWithoutNationals)
    };
    loadingMovies()
  },
    [position]);

  const getResumeMovies = (user) => {
    const moviesJson = require('../assets/moviesToResume.json')

    return moviesJson[user]
  }

  return (
    <AppContext.Consumer>
      {({ user }) => (
        <>
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="light-content"
          />
          <Container>
            <Poster source={require('../assets/poster.jpg')}>
              <Gradient
                locations={[0, 0.2, 0.6, 0.93]}
                colors={[
                  'rgba(0,0,0,0.5)',
                  'rgba(0,0,0,0.0)',
                  'rgba(0,0,0,0.0)',
                  'rgba(0,0,0,1)',
                ]}>
                <Header />
                <Hero />
              </Gradient>
            </Poster>
            <Movies label={translate('recommended')} data={movies} />
            {
              nationalMovies && nationalMovies.length > 0 && <Movies label={translate('national')} data={nationalMovies} />
            }
            <Movies label={`${translate('continueWatchingAs')} ${user}`} data={getResumeMovies(user)} />
          </Container>
        </>)
      }
    </AppContext.Consumer>
  );
};

export default Home;
