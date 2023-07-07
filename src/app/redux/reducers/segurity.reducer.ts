

import { createReducer, on } from '@ngrx/store';
import { Allow, IUserData } from 'src/app/interfaces/auth.interface';
import * as actions from '../actions/segurity.actions';

export interface ISegurityState {
  loadMenu:    boolean;
  menuSystem:  Allow[];

  userData?: IUserData;
};

const initialState: ISegurityState = {
  loadMenu:    false,
  menuSystem:  []
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
    (state) => ({...state, loadMenu: false, menuSystem: [], userData: undefined}),
  ),


  on(
    actions.onLoadMenuSystem,
    (state, { allow, userData }) => {

      return {...state, menuSystem: allow, userData: {...userData}};
    },
  ),
);


