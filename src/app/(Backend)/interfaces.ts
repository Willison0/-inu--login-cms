interface LoginBody {
    username: string;
    password: string;
  }

interface Social {
  platform: string; // e.g. "Facebook", "Instagram", etc.
  handle: string; // e.g. "@johndoe"
}

interface RegisterPayloadDto {
  fName: string;
  sName: string;
  fSurname: string;
  sSurname: string;
  gender: number;
  birthdate: Date;
  nationalId: number;
  country: number;
  detailedAddress: string;
  username: string;
  // TODO Password strength validation
  password: string;
  // TODO Length validation
  national_id: number; // 30412405
  nationality: number;
  // Johndoe@gmail.com
  email: string;
  // yyyy-mm-ddThh:mm:ss:fffZ
  dateOfBirth: Date;
  socials: Social[];
  // "https://www.google.com/"
  website: string;
  description: string;
}