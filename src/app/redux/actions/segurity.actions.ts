import { createAction, props } from '@ngrx/store';
import { Allow, IUserData } from '../../interfaces/auth.interface';

export const onLoadMenu = createAction(
  '[SEGURITY] onLoadMenu'
);

export const onLoadedMenu = createAction(
  '[SEGURITY] onLoadedMenu'
);

export const onLoadMenuSystem = createAction(
  '[SEGURITY] onLoadMenuSystem',
  props<{ allow: Allow[], userData: IUserData }>()
);


export const onClear = createAction(
  '[SEGURITY] onClear',
);
