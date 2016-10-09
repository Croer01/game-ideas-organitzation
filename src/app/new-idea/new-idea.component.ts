/**
 * Created by Adria on 21/08/2016.
 */
import {Component, OnInit} from '@angular/core';
import {IdeaDatabase} from "../persistance/database.service";
import {Idea} from "../persistance/Idea";
import {ActivatedRoute, Router} from "@angular/router";
const slash = require('slash');

@Component({
    moduleId: slash(module.id),
    selector: 'new-idea',
    templateUrl: 'new-idea.tmpl.html',
    styleUrls: ['new-idea.css']
})
export class NewIdeaComponent implements OnInit {
    private newIdea: Idea;
    private ideas: Idea[];
    private ideaToLink;

    constructor(private db: IdeaDatabase,
                private router: Router,
                private route: ActivatedRoute) {
    }

    public ngOnInit(): void {
        this.route.data.forEach((data: {ideas: Idea[]})=> {
            this.ideas = data.ideas
        });
        this.newIdea = new Idea();
    }

    public addIdea(): void {
        this.db.insert(this.newIdea).then(()=> {
            this.router.navigate(['/']);
        });
    }

    public linkIdea(): void {
        if (this.ideaToLink && this.newIdea.canLink(this.ideaToLink))
            this.newIdea.linkIdea(this.ideaToLink);
    }

    public deleteIdea(index): void {
        this.newIdea.relatedIdeas.splice(index, 1);
    }

}
