

import { createReducer, on } from '@ngrx/store';
import { Allow,  } from 'src/app/interfaces/auth.interface';
import * as actions from '../actions/segurity.actions';
import { IUserData } from '../../interfaces/auth.interface';

export interface ISegurityState {
  loadMenu:    boolean;
  menuSystem:  Allow[];

  userData: IUserData;
};

const initialState: ISegurityState = {
  loadMenu:    false,
  menuSystem:  [],
  userData: {
    phone: '',
    client: '',
    createAt: '',
    email: '',
    fullname: '',
    google: false,
    isVerify: false,
    location: '',
    mrn: '',
    roles: [],
    status: true,
  }
};

export const SegurityReducer = createReducer(
  initialState,
  on(
    actions.onLoadedMenu,
    (state) => ({...state, loadMenu: false}),
  ),

  on(
    actions.onLoadMenu,
    (state) => ({...state, loadMenu: true}),
  ),

  on(
    actions.onClear,
    (state) => {

      return {
        ...state,
        loadMenu: false,
        menuSystem: [],
        userData: {
          phone: '',
          client: '',
          createAt: '',
          email: '',
          fullname: '',
          google: false,
          isVerify: false,
          location: '',
          mrn: '',
          roles: [],
          status: true,
        }
      };
    },
  ),

  on(
    actions.onUpdateAdditional, (state, { client, location, mrn }) => {

      const { userData } = state;

      let newUdata = {...userData};

      newUdata.location = location;
      newUdata.client = client;
      newUdata.mrn = mrn;

      return {...state, userData: newUdata };
    },
  ),

  on(
    actions.onLoadMenuSystem,
    (state, { allow, userData }) => {

      return {...state, menuSystem: allow, userData: {...userData}};
    },
  ),


);


