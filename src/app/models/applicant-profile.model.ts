export class ApplicantProfileModel {
  id?: number;
  personal: {
    name: string;
    surname: string;
    // email: string;
    phone: string;
    postcode: number;
    distance: number;
  }
  license: string;
  placeOfWork: { [name: string]: boolean };
  workingExperience: number;
  shift: { [name: string]: boolean };
  tours: { [name: string]: boolean };
  startToWork: Date;
  language: { [name: string]: number };
  legal: {
    dsgvo: boolean;
    agb: boolean;
  }
}
