import { IChartLikes } from "../models/IChartLikes";
import { IVacation } from "../models/IVacation";

interface IStateUser {
    userId?: number;
    userName?: string;
    userType?: string;
}

export class AppState {
    public vacationsDataForChart: IChartLikes[] = [];
    public vacationsArray: IVacation[] = [];
    public userState: IStateUser = {};
}