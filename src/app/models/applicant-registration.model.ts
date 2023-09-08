export class ApplicantRegistrationModel {
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  role?: [number];
  social_account?:[number]
  _token?: string;
  _tokenExpirationDate?: Date

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}
