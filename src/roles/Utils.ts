const PERMISSIONS_MAP: any = {
  add_group: "Agregar Roles",
  change_group: "Modificar Roles",
  view_group: "Ver Roles",
  delete_group: "Eliminar Roles",
  add_user: "Agregar Usuarios",
  change_user: "Modificar Usuarios",
  view_user: "Ver Usuarios",
  delete_user: "Eliminar Usuarios",
};

export const permissionsOptions: { text: string; value: string }[] =
  Object.entries(PERMISSIONS_MAP).map((val) => ({
    text: val[1] as string,
    value: val[0],
  }));

export const permissionDesc = (code: string) => PERMISSIONS_MAP[code];
