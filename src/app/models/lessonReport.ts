import { Simulator } from "./simulator";
import { User } from "./user";

export class LessonReport{
    
    name: string;
    simulator: Simulator;
    ocorrance: string;
    date:string;
    user: User;

    constructor(lesson: LessonReport){
        this.name = lesson.name;
        this.simulator = lesson.simulator;
        this.ocorrance = lesson.ocorrance;
        this.date = lesson.date;
        this.user = lesson.user
    }
}