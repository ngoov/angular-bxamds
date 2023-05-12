import { Address } from "../types/address";
import { test, enforce } from "vest";


export function addressValidations(model: Address, field: string): void {
  test(`${field}.street`, 'Street is required', () => {
    enforce(model.street).isNotBlank();
  });
}