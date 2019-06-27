import { initialApplicationState, ApplicationState } from '../state/application.state';
import { ApplicationActions, EApplicationActions } from '../actions/application.action'

export const applicationReducers = (
    state = initialApplicationState,
    action: ApplicationActions
): ApplicationState => {
    switch (action.type) {
        case EApplicationActions.CreateApplication:
            return {
                ...state,
                application: action.payload
            };

        case EApplicationActions.UpdateApplicationsList:
            return {
                ...state,
                applications: action.payload
            };
            
        default:
            return state;
    }
};
