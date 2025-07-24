export type User = {
  id: string;
  displayName: string;
  email: string;
  token: string;
  imageUrl?: string;
}


export type LoginCreds = {
  email: string;
  password: string;
}

export type RegisterCreds = {
  username: string;
  knownAs: string;
  gender: string;
  dateOfBirth: string; // format: 'yyyy-MM-dd'
  city: string;
  country: string;
  password: string;
  email: string;
  displayName: string;
}

