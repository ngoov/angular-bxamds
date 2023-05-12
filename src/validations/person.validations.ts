import { Person } from '../types/person';
import { test, enforce, create, only } from 'vest';

export const personValidations = create((model: Person, field: string) => {
  only(field);
  test('name', 'Name is required', () => {
    enforce(model.name).isNotBlank();
  });
  test('hair_color', 'Hair color is required', () => {
    enforce(model.hair_color).isNotBlank();
  });
  test('hair_color', 'Hair color can not be blond', () => {
    enforce(model.hair_color).notEquals('blond');
  });
  test('gender', 'Gender is required', () => {
    enforce(model.gender).isNotBlank();
  });
  test('films', 'At least one film should be chosen', () => {
    enforce(model.films.length).greaterThan(0);
  });
  test('species', 'At least one species should be chosen', () => {
    enforce(model.species.length).greaterThan(0);
  });
});
