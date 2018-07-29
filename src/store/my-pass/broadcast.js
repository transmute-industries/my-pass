
import { store } from '../../store';

import * as actionCreators from './actionCreators';



export const newUserSession = ((registrationResults) =>{
    store.dispatch(actionCreators.newUserSession(registrationResults));
})