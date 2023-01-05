const FIELD_TYPES_MAP: any = {
  int: "Entero",
  float: "Decimal",
  str: "Texto",
};

export const getFieldTypeName = (raw: string): string => {
  if (raw.startsWith("list__")) {
    const lastType = raw.split("__")[1];
    return `Lista de ${FIELD_TYPES_MAP[lastType] || lastType}`;
  }

  return FIELD_TYPES_MAP[raw] || raw;
};
