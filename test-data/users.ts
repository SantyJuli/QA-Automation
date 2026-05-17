export type User = {
  username: string;
  password: string;
};

export const standardUser: User = {
  username: 'standard_user',
  password: 'secret_sauce',
};

export const problemUser: User = {
  username: 'problem_user',
  password: 'secret_sauce',
};

export const lockedOutUser: User = {
  username: 'locked_out_user',
  password: 'secret_sauce',
};
