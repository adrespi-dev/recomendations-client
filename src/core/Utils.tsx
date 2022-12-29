import { AxiosError } from "axios";

type ValidationError = { name: string; errors: string[] };

export const getValidationErrors = (e: Error): ValidationError[] | null => {
  if (e instanceof AxiosError) {
    if (e.response?.status == 400) {
      const data = e.response?.data || {};
      const errors: ValidationError[] = [];

      for (const [key, value] of Object.entries(data)) {
        const errorsVal = Array.isArray(value) ? value : [value];
        errors.push({ name: key, errors: errorsVal });
      }

      console.log(errors);
      return errors;
    }
  }

  return null;
};
