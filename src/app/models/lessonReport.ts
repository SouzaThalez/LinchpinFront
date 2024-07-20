import { User } from "../components/models/user";
import { Simulator } from "./simulator";

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