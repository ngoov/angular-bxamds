import { test, enforce, omitWhen } from "vest";

export function passwordValidations(model: {password: string, confirmPassword: string}, field: string): void{
  test(`${field}.password`, 'Password is required', () => {
    enforce(model.password).isNotBlank();
  });
  omitWhen(
    !model.password || !model.confirmPassword,
    () => {
      test(`${field}`, 'Passwords should match', () => {
        enforce(model.password).equals(
          model.confirmPassword
        );
      });
    }
  );
  omitWhen(!model.password, () => {
    test(`${field}.password`, 'Should be more than 5 characters', () => {
      enforce(model.password).longerThan(5);
    });
  });
}