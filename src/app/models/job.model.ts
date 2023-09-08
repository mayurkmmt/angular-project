export class JobModel {
  companyId:number;
  companyLogo: String;
  companyName: String;
  companySize: String;
  industry: String;
  aboutCompany: String;
  id: number;
  title: string;
  location: string;
  entryDate: string;
  workingHours: string;
  keywords: [{name:string}]
  jobDetails: [{item:string}];
  skills: [{name:string, rating:number}];
  companyAdvantages: [{name:string}];
  connection: [{name:string}];
  workingTimeModel: [{name:string}];

}
