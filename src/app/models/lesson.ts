export class Lesson{
    id: number;
    name:string;
    updateDate: string;
    description:string;

    constructor(lesson: Lesson){
        this.id = lesson.id;
        this.name = lesson.name;
        this.updateDate = lesson.updateDate;
        this.description = lesson.description;
    }
}