import { Film } from "../../../types/film";
import { Person } from "../../../types/person";
import { PeopleState } from "../../../state/people.state";
import { Species } from '../../../types/species';

export type State = Pick<PeopleState, 'people'> & {
  species: Species[];
  films: Film[];
  // We want to keep 2 versions of the person: Original and Updated
  person: Person;
  form: Person;
  formDirty: boolean;
  formValid: boolean;
};

export type ViewModel = Pick<
  State,
  'films' | 'species' | 'formDirty' | 'formValid'
> & {
  name: string;
  form: Person;
  filmsDisabled: boolean;
  nextPersonButtonDisabled: boolean;
  previousPersonButtonDisabled: boolean;
  nextPersonId: string | null;
  previousPersonId: string | null;
  hideSpecies: boolean;
};