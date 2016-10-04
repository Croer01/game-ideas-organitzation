import {Idea} from "./Idea";
export class IdeaRef {
    public _id: string;
    public title: string;

    constructor(idea: Idea){
        this._id = idea._id;
        this.title = idea.title;
    }
}
