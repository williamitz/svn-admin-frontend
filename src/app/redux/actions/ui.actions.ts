import { createAction, props } from "@ngrx/store";
import { Allow } from "src/app/interfaces/auth.interface";

export const onResizeScreen = createAction(
  '[UI] onResizeScreen',
  props<{ screenWidth: number }>()
);

export const onToggle = createAction(
  '[UI] onToggle'
);

