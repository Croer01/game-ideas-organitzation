/**
 * Created by Adria on 21/08/2016.
 */
import {Component, OnInit} from '@angular/core';
import {IdeaDatabase} from "../persistance/database.service";
import {Idea} from "../persistance/Idea";
const slash = require('slash');

@Component({
    moduleId: slash(module.id),
    selector: 'main-content',
    templateUrl: 'main-content.tmpl.html'
})
export class MainContentComponent implements OnInit {
    private newIdea: Idea;
    private ideas: Array<Idea>;
    private ideaToLink;

    constructor(private db: IdeaDatabase) {
    }

    public ngOnInit(): void {
        this.newIdea = new Idea();
        this.db.loaded.then(() => this.db.findAll().then((ideas)=>this.ideas = ideas));
    }

    public addIdea(): void {
        this.db.insert(this.newIdea).then((idea)=>this.ideas.push(idea));
        this.newIdea = new Idea();
    }

    public linkIdea(): void {
        if (this.ideaToLink && this.newIdea.canLink(this.ideaToLink))
            this.newIdea.linkIdea(this.ideaToLink);
    }

}
