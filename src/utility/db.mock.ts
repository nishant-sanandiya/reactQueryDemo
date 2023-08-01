import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserTypes} from '../types';

const getList = async (): Promise<Array<UserTypes>> => {
  try {
    const data = await AsyncStorage.getItem('users');
    if (data) {
      const list = await JSON.parse(data);
      return list;
    } else {
      return [];
    }
  } catch (err) {
    return [];
  }
};

const addToDo = async (user: UserTypes): Promise<boolean> => {
  try {
    const data = await AsyncStorage.getItem('users');
    if (data) {
      const list = await JSON.parse(data);
      const tempList = [user, ...list];
      await AsyncStorage.setItem('users', JSON.stringify(tempList));
      return true;
    } else {
      const tempList = [user];
      await AsyncStorage.setItem('users', JSON.stringify(tempList));
      return true;
    }
  } catch (err) {
    return false;
  }
};

export const getUserList = (): Promise<UserTypes[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const list = await getList();
      if (list.length > 0) {
        resolve(list);
      } else {
        resolve([]);
      }
    } catch (err) {
      reject('Something Went Wrong Please Try Again');
    }
  });
};

export const addUser = (data: UserTypes): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await addToDo(data);
      if (response === true) {
        resolve();
      } else {
        reject('Something Went Wrong Please Try Again');
      }
    } catch (err) {
      reject('Something Went Wrong Please Try Again');
    }
  });
};
