import { User } from "../auth/User";
import { apiClient } from "../core/ApiClient";

export const getUsers = async () => {
  const result = await apiClient.get<User[]>("/auth/users/");
  return result.data;
};

export const createUser = async (values: any) => {
  const result = await apiClient.post<User>("/auth/users/", values);
  return result.data;
};

export const updateUser = async ({
  userId,
  values,
}: {
  userId: number;
  values: any;
}) => {
  const result = await apiClient.put(`/auth/users/${userId}/`, values);
  return result.data;
};

export const deleteUser = async (userId: number) => {
  const result = await apiClient.delete(`/auth/users/${userId}`);
  return result.data;
};
