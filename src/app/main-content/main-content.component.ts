/**
 * Created by Adria on 21/08/2016.
 */
import {Component, OnInit} from '@angular/core';
import {IdeaDatabase} from "../persistance/database.service";
const slash = require('slash');

@Component({
    moduleId: slash(module.id),
    selector: 'main-content',
    templateUrl: 'main-content.tmpl.html'
})
export class MainContentComponent implements OnInit {
    private newIdea: any;
    private ideas: Array<any>;
    private ideaToLink;

    constructor(private db: IdeaDatabase) {
    }

    public ngOnInit(): void {
        this.newIdea = {relatedIdeas:[]};
        this.db.loaded.then(() => this.db.findAll().then((ideas)=>this.ideas = ideas));
    }

    public addIdea(): void {
        this.db.insert(this.newIdea).then((idea)=>this.ideas.push(idea));
        this.newIdea = {relatedIdeas:[]};
    }

    public linkIdea(): void {
        if (this.ideaToLink && this.newIdea.relatedIdeas.indexOf(this.ideaToLink) === -1)
            this.newIdea.relatedIdeas.push(this.ideaToLink._id);
    }

}
