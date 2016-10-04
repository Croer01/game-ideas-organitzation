import {IdeaRef} from "./IdeaRef";

export class Idea {
    public _id: string;
    public title: string;
    public description: string;
    public relatedIdeas: Array<IdeaRef>;

    constructor() {
        this.relatedIdeas = [];
    }

    public canLink(ideaToLink: Idea): Boolean {
        var exist: Boolean = false;
        var i: number = 0;
        while (!exist && i < this.relatedIdeas.length) {
            if (ideaToLink._id === this.relatedIdeas[i]._id)
                exist = true;
            i++;
        }
        return !exist;
    }

    public linkIdea(ideaToLink: Idea): void {
        this.relatedIdeas.push(new IdeaRef(ideaToLink));
    }
}
