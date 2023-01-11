import { useRecoilValue } from "recoil";
import { currentPermissionsState } from "./State";

export const useHasPermission = () => {
  const { permissions, role } = useRecoilValue(currentPermissionsState)!;

  return (permission: string) => {
    return role === "SuperAdmin" || !!permissions.find((p) => p === permission);
  };
};
