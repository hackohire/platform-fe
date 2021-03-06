import { initialApplicationState, ApplicationState } from '../state/application.state';
import { ApplicationActions, EApplicationActions } from '../actions/application.action'

export function applicationReducers(
    state = initialApplicationState,
    action: ApplicationActions
): ApplicationState {
    switch (action.type) {
        case EApplicationActions.CreateApplication:
            return {
                ...state,
                selectedApplication: action.payload
            };

        case EApplicationActions.UpdateApplicationsList:
            return {
                ...state,
                applications: action.payload
            };

        case EApplicationActions.SetSelectedApp:
            return {
                ...state,
                selectedApplication: action.app
            };

        default:
            return state;
    }
};
