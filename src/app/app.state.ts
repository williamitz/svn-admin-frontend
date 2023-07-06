import {ActionReducerMap} from  '@ngrx/store/src'
import { IUIState, UiReducer } from './redux/reducers/ui.reducer'
import { ISegurityState, SegurityReducer } from './redux/reducers/segurity.reducer'

export interface IAppState {
  ui: IUIState,
  segurity: ISegurityState,
}


export const AppState: ActionReducerMap<IAppState> = {
  ui: UiReducer,
  segurity: SegurityReducer
}
