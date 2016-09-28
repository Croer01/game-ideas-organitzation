/**
 * Created by Adria on 21/08/2016.
 */
import {Component, OnInit} from '@angular/core';
import {IdeaDatabase} from "../database.service";
const slash = require('slash');

@Component({
    moduleId: slash(module.id),
    selector: 'main-content',
    templateUrl: 'main-content.tmpl.html'
})
export class MainContentComponent implements OnInit {
    private newIdea: any;
    private ideas: Array<any>;

    constructor(private db: IdeaDatabase) {
    }

    ngOnInit(): void {
        this.newIdea = {};
        this.db.loaded.then(() => this.db.findAll().then((ideas)=>this.ideas = ideas));
    }

    public addIdea() {
        this.db.insert(this.newIdea).then((idea)=>this.ideas.push(idea));
        this.newIdea = {};
    }

}
