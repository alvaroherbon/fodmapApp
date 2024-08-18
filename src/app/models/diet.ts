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



    deleteItem(item: string): void {
        if (this.breakfast.includes(item)) {
            this.breakfast = this.breakfast.filter(food => food !== item);
        } else if (this.lunch.includes(item)) {
            this.lunch = this.lunch.filter(food => food !== item);
        } else if (this.dinner.includes(item)) {
            this.dinner = this.dinner.filter(food => food !== item);
        }
    }


}
