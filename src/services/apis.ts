import Axios from 'axios';
import {JokeType, UserListApiPayload} from '../types';

export const getRandomJokeApi = async (): Promise<JokeType> => {
  try {
    const response: any = await Axios.get(
      'https://official-joke-api.appspot.com/random_joke',
    );
    if (response?.data) {
      return response?.data;
    } else {
      throw response?.data;
    }
  } catch (err) {
    throw err;
  }
};

export const getUsersListApi = async (
  pageNumber: number,
): Promise<UserListApiPayload> => {
  try {
    const response: any = await Axios.get(
      `https://reqres.in/api/users?page=${pageNumber}`,
    );
    if (response?.data) {
      return response?.data;
    } else {
      throw response?.data;
    }
  } catch (err) {
    throw err;
  }
};
