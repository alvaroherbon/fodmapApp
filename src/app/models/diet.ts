import { Food } from "./food";

export class Diet {
 breakfast: String[];
 lunch: String[];
dinner: String[];

    constructor(breakfast: String[], lunch: String[], dinner: String[]) {
        this.breakfast = breakfast;
        this.lunch = lunch;
        this.dinner = dinner;
    }


}
