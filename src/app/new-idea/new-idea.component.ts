/**
 * Created by Adria on 21/08/2016.
 */
import {Component, OnInit} from '@angular/core';
import {Idea} from "../persistance/Idea";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../alert/alert.service";
import {StorageService} from "../../storage/storage.service";
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

    constructor(private storage: StorageService,
                private router: Router,
                private route: ActivatedRoute,
                private alertService: AlertService) {
    }

    public ngOnInit(): void {
        this.route.data.forEach((data: {ideas: Idea[]})=> {
            this.ideas = data.ideas
        });
        this.newIdea = new Idea();
    }

    public addIdea(): void {
        this.storage.saveDocument(this.newIdea).then(()=> {
            this.alertService.showSuccess(`idea "${this.newIdea.title}" created successful`);
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
