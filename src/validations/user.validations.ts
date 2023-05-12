import { User } from '../types/user';
import { test, group, enforce, create, only, omitWhen } from 'vest';
import { addressValidations } from './address.validations';
import { passwordValidations } from './password.validations';

export const userValidations = create((model: User, field: string) => {
  only(field);

  test('firstName', 'First name is required', () => {
    enforce(model.firstName).isNotBlank();
  });
  test('lastName', 'Last name is required', () => {
    enforce(model.lastName).isNotBlank();
  });
  addressValidations(model.address, 'address');
  passwordValidations(model.passwords, 'passwords');
});
// todo: only show validations on submit and blur
// todo: research composition of different suites, use-case: address
// todo: check validation for form arrays
