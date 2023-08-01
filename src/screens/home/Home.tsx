import React from 'react';
import {Text, SafeAreaView, ActivityIndicator, Button} from 'react-native';
import {styles} from './styles';
import {useQuery} from '@tanstack/react-query';
import {getRandomJokeApi} from '../../services/apis';
import {JokeType} from '../../types';
import {Colors} from '../../constants';

export const Home = (props: any) => {
  const {isLoading, error, data} = useQuery({
    queryKey: ['getRandomJokeApi'],
    queryFn: (): Promise<JokeType> => getRandomJokeApi(),
  });

  const navigateToNextPage = () => {
    props?.navigation?.navigate('userList');
  };

  const navigateTodoListPage = () => {
    props?.navigation?.navigate('todoList');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.jokeStyle}>Joke</Text>
      {isLoading || error ? (
        <ActivityIndicator color={Colors.skyBlue} size={'large'} />
      ) : (
        <>
          <Text style={styles.jokeTextStyle}>{`setup :- ${data?.setup}`}</Text>
          <Text
            style={
              styles.jokeTextStyle
            }>{`punchline :- ${data?.punchline}`}</Text>
        </>
      )}
      <Button onPress={navigateToNextPage} title="Next Page" />
      <Button onPress={navigateTodoListPage} title="Todo List Page" />
    </SafeAreaView>
  );
};
