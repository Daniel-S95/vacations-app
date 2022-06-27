import { AppState } from "./app-state";
import { Action } from "./action";
import { ActionType } from "./action-type";

// This function is NOT called direcrtly by you

let initialAppState = new AppState();

export function reduce(oldAppState: AppState = initialAppState, action: Action): AppState {
    // Cloning the oldState (creating a copy)
    const newAppState = { ...oldAppState };

    switch (action.type) {
        case ActionType.GetAllVacations:
            newAppState.vacationsArray = action.payload;
            break;
        case ActionType.GetVacationForChart:
            newAppState.vacationsDataForChart = action.payload;
            break;
        case ActionType.AddVacation:
            newAppState.vacationsArray = [...oldAppState.vacationsArray, action.payload];
            break;
        case ActionType.DeleteVacation:
            let vacationId = action.payload;
            newAppState.vacationsArray = oldAppState.vacationsArray.filter(vacation => vacation.id !== vacationId);
            break;
        case ActionType.UpdateVacation: {
            let vacationData = action.payload;
            let vacation = oldAppState.vacationsArray.find(x => x.id === vacationData.id);
            let updatedVacation: any = { ...vacation, id: vacationData.id, city: vacationData.city, country: vacationData.country, description: vacationData.description, imageURL: vacationData.imageURL, price: vacationData.price, startDate: vacationData.startDate, endDate: vacationData.endDate };

            newAppState.vacationsArray = oldAppState.vacationsArray.filter(vacation => vacation.id !== vacationData.id);
            newAppState.vacationsArray.push(updatedVacation);
            newAppState.vacationsArray.sort((a, b) => b.isLiked - a.isLiked || a.id - b.id);
        }
            break;
        case ActionType.LikeVacationStatus: {
            let vacationData = action.payload;
            let updatedLikesCounter = oldAppState.vacationsArray.find(x => x.id === vacationData.id)!.vacationLikes;
            vacationData = { ...vacationData, vacationLikes: updatedLikesCounter };

            newAppState.vacationsArray = oldAppState.vacationsArray.filter(vacation => vacation.id !== vacationData.id);
            newAppState.vacationsArray.push(vacationData);
            newAppState.vacationsArray.sort((a, b) => b.isLiked - a.isLiked || a.id - b.id);
        }
            break;
        case ActionType.IncreaseLikesCounter: {
            let vacation = oldAppState.vacationsArray.find(x => x.id === action.payload);
            let updatedVacation: any = { ...vacation, vacationLikes: vacation!.vacationLikes + 1 };

            newAppState.vacationsArray = oldAppState.vacationsArray.filter(vacation => vacation.id !== action.payload);
            newAppState.vacationsArray.push(updatedVacation);
            newAppState.vacationsArray.sort((a, b) => b.isLiked - a.isLiked || a.id - b.id);
        }
            break;
        case ActionType.DecreaseLikesCounter: {
            let vacation = oldAppState.vacationsArray.find(x => x.id === action.payload);
            let updatedVacation: any = { ...vacation, vacationLikes: vacation!.vacationLikes - 1 };

            newAppState.vacationsArray = oldAppState.vacationsArray.filter(vacation => vacation.id !== action.payload);
            newAppState.vacationsArray.push(updatedVacation);
            newAppState.vacationsArray.sort((a, b) => b.isLiked - a.isLiked || a.id - b.id);
        }
            break;
        case ActionType.UserLoggedIn:
            newAppState.userState = action.payload;
            break;
        case ActionType.UserLoggedOut:
            newAppState.userState = {};
            break;
    }

    // After returning the new state, it's being published to all subscribers
    // Each component will render itself based on the new state
    return newAppState;
}