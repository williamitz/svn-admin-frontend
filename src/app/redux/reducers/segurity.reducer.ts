

import { createReducer, on } from '@ngrx/store';
import { Allow } from 'src/app/interfaces/auth.interface';
import * as actions from '../actions/segurity.actions';

export interface ISegurityState {
  loadMenu:    boolean;
  menuSystem:  Allow[];
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
    actions.onLoadMenuSystem,
    (state, { allow }) => {

      return {...state, menuSystem: allow};
    },
  ),
);


