import {Usuario} from '../interfaces/interfaces';

export interface AuthState {
  status: 'checking' | 'athenticated' | 'not-authenticated';
  token: string | null;
  errorMessage: string;
  user: Usuario | null;
}

type AuthAction =
  | {type: 'signIn'; payload: {token: string; user: Usuario}}
  | {type: 'addError'; payload: string}
  | {type: 'removeError'}
  | {type: 'notAuthenticated'}
  | {type: 'logout'};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'addError':
      return {
        ...state,
        errorMessage: action.payload,
        user: null,
        status: 'not-authenticated',
        token: null,
      };

    case 'removeError': {
      return {...state, errorMessage: ''};
    }
    case 'signIn':
      return {
        ...state,
        errorMessage: '',
        status: 'athenticated',
        token: action.payload.token,
        user: action.payload.user,
      };

    case 'logout':
    case 'notAuthenticated':
      return {
        ...state,
        status: 'not-authenticated',
        token: null,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
