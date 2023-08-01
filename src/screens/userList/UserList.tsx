import React, {useEffect, useMemo} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  View,
} from 'react-native';
import {UserItem} from './component/UserItem';
import {UserListApiPayload, UserTypes} from '../../types/index';
import {styles} from './styles';
import {useInfiniteQuery} from '@tanstack/react-query';
import {getUsersListApi} from '../../services/apis';
import {EmptyList} from '../../components/EmptyList';
import {Colors} from '../../constants';

export const UserList = () => {
  const {
    isLoading,
    isError,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    refetch,
    isRefetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['getUsersListApi', Math.random().toString],
    async ({pageParam = 1}): Promise<UserListApiPayload> => {
      const res = await getUsersListApi(pageParam);
      return res;
    },
    {
      getNextPageParam: lastPage => {
        if (lastPage.page !== lastPage.total_pages) {
          return lastPage.page + 1;
        } else {
          return undefined;
        }
      },
    },
  );

  useEffect(() => {
    if (isError) {
      Alert.alert('error', JSON.stringify(error));
    }
  }, [error, isError]);

  const list = useMemo(
    () =>
      data?.pages
        .map(obj => obj.data)
        .reduce((state, obj) => state.concat(obj)),
    [data],
  );

  const renderItemHandler = (item: UserTypes) => {
    return <UserItem data={item} />;
  };

  const emptyListHandler = () => {
    return <EmptyList />;
  };

  const loadMoreHandler = () => {
    console.log(
      'OnEndReached called :- ',
      hasNextPage,
      !isFetching,
      !isFetchingNextPage,
    );
    if (hasNextPage === true && !isFetching && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const onRefreshPressHandler = () => {
    refetch();
  };

  const onEndLoaderHandler = () => {
    if (hasNextPage) {
      return (
        <View style={styles.endLoaderView}>
          <ActivityIndicator size={'large'} color={Colors.skyBlue} />
        </View>
      );
    } else {
      return <></>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.listStyle}
        data={list}
        refreshing={isLoading || isRefetching}
        onRefresh={onRefreshPressHandler}
        ListEmptyComponent={emptyListHandler}
        renderItem={({item}) => renderItemHandler(item)}
        onEndReached={loadMoreHandler}
        ListFooterComponent={onEndLoaderHandler}
        onEndReachedThreshold={0.01}
      />
    </SafeAreaView>
  );
};
