export type Feature = {
  id: number;
  collection: string;
  field_name: string;
  field_type: string;
  classification: string;
  distribution: [string, number][];
  values: any[];
};
