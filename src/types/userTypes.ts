export interface UserTypes {
  avatar: number;
  email: string;
  first_name: string;
  id: string;
  last_name: string;
}

export interface UserListApiPayload {
  data: Array<UserTypes>;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}
