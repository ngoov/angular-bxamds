import { z } from 'zod';

export class Address {
  public street = '';
  public number = '';
  public city = '';
  public zipcode = '';
  public country = '';

  constructor(address?: Partial<Address>) {
    if (address) {
      Object.assign(this, { ...address });
    }
  }
}
export type addressSchema = z.infer<typeof Address>;

export function addressValidations(model: Address, field: string): void {
  test(`${field}.street`, 'Street is required', () => {
    enforce(model.street).isNotBlank();
  });
}
