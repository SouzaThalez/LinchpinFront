export class Curse {
    name: string;
    label: string;
    lessonType: string;
    updateDate: string;
    description: string;
    id: number;

    constructor(curse: Curse){
        this.name = curse.name;
        this.label = curse.label;
        this.lessonType = curse.lessonType;
        this.id = curse.id;
        this.updateDate =  curse.updateDate;
        this.description = curse.description;
    }

}