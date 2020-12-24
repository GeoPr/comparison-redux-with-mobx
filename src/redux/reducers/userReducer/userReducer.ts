import { CHANGE_USERNAME } from './actionsTypes';
import { TActions } from './../../store';
import * as actions from './actions';

interface IInitalState {
  username: string;
}

const initalState: IInitalState = {
  username: 'GeoPr',
};

type ActionsTypes = TActions<typeof actions>;

export const userReducer = (
  state: IInitalState = initalState,
  action: ActionsTypes,
): IInitalState => {
  if (action.type === CHANGE_USERNAME) {
    return { ...state, username: action.payload.username };
  }

  return state;
};
