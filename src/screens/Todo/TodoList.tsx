import React, {useEffect} from 'react';
import {Alert, Button, FlatList, SafeAreaView} from 'react-native';
import {styles} from './style';
import {UserItem} from '../userList/component/UserItem';
import {UserTypes} from '../../types';
import {getUserList} from '../../utility/db.mock';
import {useQuery} from '@tanstack/react-query';

export const TodoList = (props: any) => {
  const {isError, error, data, isRefetching, refetch} = useQuery({
    queryKey: ['getUserList'],
    queryFn: (): Promise<UserTypes[]> => getUserList(),
  });

  useEffect(() => {
    if (isError) {
      Alert.alert('error :- ', JSON.stringify(error));
    }
  }, [error, isError]);

  const renderItemHandler = (user: UserTypes) => {
    return (
      <UserItem key={user.first_name} style={{height: undefined}} data={user} />
    );
  };

  const onToDoPressHandler = () => {
    props.navigation.navigate('addTodo');
  };

  const pullToRefresh = () => {
    refetch();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Add TODO" onPress={onToDoPressHandler} />
      <FlatList
        onRefresh={pullToRefresh}
        refreshing={isRefetching}
        data={data}
        keyExtractor={({first_name}) => first_name}
        renderItem={({item}) => renderItemHandler(item)}
      />
    </SafeAreaView>
  );
};
