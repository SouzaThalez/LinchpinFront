export class Lesson{
    name:string;
    updateDate: string;
    description: string;
    id: number;

    constructor(lesson: Lesson){
        this.name = lesson.name;
        this.updateDate = lesson.updateDate;
        this.description = lesson.description;
        this.id = lesson.id;
    }
}