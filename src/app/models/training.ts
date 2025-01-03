import { Lesson } from "./lesson";

export class Training{
    name: string;
    value: string;
    lessons: Lesson[];
    updateDate: string;
    description: string;
    id: number;

    constructor(training: Training){
        
        this.name = training.name;
        this.value = training.value; 
        this.lessons = training.lessons;
        this.id = training.id;
        this.updateDate =  training.updateDate;
        this.description = training.description;
    }
}