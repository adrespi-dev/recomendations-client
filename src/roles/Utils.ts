const PERMISSIONS_MAP: any = {
  add_group: "Agregar Roles",
  change_group: "Modificar Roles",
  view_group: "Ver Roles",
  delete_group: "Eliminar Roles",

  add_user: "Agregar Usuarios",
  change_user: "Modificar Usuarios",
  view_user: "Ver Usuarios",
  delete_user: "Eliminar Usuarios",

  view_recmodel: "Ver modelos",
  add_recmodel: "Crear modelos",
  change_recmodel: "Modificar modelos",
  delete_recmodel: "Eliminar modelos",

  view_traininglog: "Ver historial de entrenamiento",

  view_feature: "Ver características",
  add_feature: "Agregar características",
  delete_feature: "Eliminar características",
};

export const permissionDesc = (code: string) => PERMISSIONS_MAP[code];

type PermissionsGroup = {
  groupName: string;
  permissions: { code: string; description: string }[];
};

const groups = ["group", "user", "recmodel", "traininglog", "feature"];
const groupNames: any = {
  group: "Grupo",
  user: "Usuario",
  recmodel: "Modelo",
  traininglog: "Historial",
  feature: "Características",
};

export const groupPermissions = (codes: string[]): PermissionsGroup[] => {
  const result: PermissionsGroup[] = [];

  groups.forEach((g) => {
    const groupCodes = codes
      .filter((c) => c.endsWith(`_${g}`))
      .map((c) => ({ code: c, description: permissionDesc(c) }));

    if (groupCodes.length) {
      result.push({ groupName: groupNames[g], permissions: groupCodes });
    }
  });

  return result;
};

export const groupPermissionsOptions = (): {
  label: string;
  options: { label: string; value: string }[];
}[] => {
  const groups = groupPermissions(Object.keys(PERMISSIONS_MAP));
  return groups.map((g) => ({
    label: g.groupName,
    options: g.permissions.map((p) => ({
      label: p.description,
      value: p.code,
    })),
  }));
};
