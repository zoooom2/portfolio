import { ChangeEvent } from 'react';
import { UserInitialStateType } from '../../types';

export const initialState: UserInitialStateType = {
  loading: true,
  isAuthenticated: false,
  user: {
    id: '',
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    photo: '',
    role: '',
  },
  orders: [],
  imageFile: {
    file: undefined,
    filePreview: undefined,
  },
};

export interface UserContextValue extends UserInitialStateType {
  authenticateUser: () => void;
  handleImage: (e: ChangeEvent<HTMLInputElement>) => void;
  removeImage: () => void;
  removeAuthentication: () => void;
  logOut: () => void;
  jwtAuth: (email: string, password: string) => void;
  googleAuth: () => void;
}
export const defaultValue: UserContextValue = {
  ...initialState,
  authenticateUser: function (): void {
    throw new Error('Function not implemented.');
  },
  handleImage: function (e: ChangeEvent<HTMLInputElement>): void {
    throw new Error('Function not implemented.');
  },
  removeImage: function (): void {
    throw new Error('Function not implemented.');
  },
  removeAuthentication: function (): void {
    throw new Error('Function not implemented.');
  },
  logOut: function (): void {
    throw new Error('Function not implemented.');
  },
  jwtAuth: function (email: string, password: string): void {
    throw new Error('Function not implemented.');
  },
  googleAuth: function (): void {
    throw new Error('Function not implemented.');
  },
};
