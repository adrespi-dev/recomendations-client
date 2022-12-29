export type User = {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  role_id: string;
  role: string;
};

export type Role = {
  id: number;
  name: string;
  permissions: string[];
};
