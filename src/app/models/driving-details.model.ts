export class DrivingDetailsModel {
  id?: number;
  user: {
    first_name: string;
    last_name: string;
    email: string;
  }
  shift: {  [name: string]: boolean };
  tours: { [name: string]: boolean };
  vehicle_experience: { [name: string]: boolean };
  phone_number :string
  postcode: number;
  distance: number;
  work_experience: number;
  start_work: string;
  license: string;
  latitude?: number;
  longitude?: number;
  language: {[name: string]: number};
  placeofwork: { [name: string]: boolean };

  workingexperience: number;
  starttowork: Date;
  legal: {
    dsgvo: boolean;
    agb: boolean;
  }
}
