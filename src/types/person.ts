export class Person {
  public name: string = '';
  public height: string = '';
  public mass: string = '';
  public hair_color: string = '';
  public skin_color: string = '';
  public eye_color: string = '';
  public birth_year: string = '';
  public gender: string = '';
  public homeworld: string = '';
  public films: string[] = [];
  public species: string[] = [];
  public vehicles: string[] = [];
  public starships: string[] = [];
  public created?: string;
  public edited?: string;
  public url?: string;
  constructor(person?: Partial<Person>) {
    if (person) {
      Object.assign(this, { ...person });
    }
  }
}
// validation on error
// validation on warning