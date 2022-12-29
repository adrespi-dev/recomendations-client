import { Role } from "../auth/User";
import { apiClient } from "../core/ApiClient";

export const getRoles = async () => {
  const result = await apiClient.get<Role[]>("/auth/groups/");
  return result.data;
};

export const createRole = async (values: any) => {
  const result = await apiClient.post<Role>("/auth/groups/", values);
  return result.data;
};

export const updateRole = async ({
  roleId,
  values,
}: {
  roleId: number;
  values: any;
}) => {
  const result = await apiClient.put(`/auth/groups/${roleId}/`, values);
  return result.data;
};

export const deleteRole = async (roleId: number) => {
  const result = await apiClient.delete(`/auth/groups/${roleId}`);
  return result.data;
};
