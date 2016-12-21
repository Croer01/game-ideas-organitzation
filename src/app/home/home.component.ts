/**
 * Created by Adria on 21/08/2016.
 */
import {Component, OnInit, ChangeDetectorRef} from "@angular/core";
import {Idea} from "../persistance/Idea";
import {ActivatedRoute} from "@angular/router";
import {IdeaDatabase} from "../persistance/database.service";
import {AlertService} from "../alert/alert.service";

const slash = require('slash');
const {dialog} = require('electron').remote;

@Component({
    moduleId: slash(module.id),
    selector: 'home',
    templateUrl: 'home.tmpl.html',
    styleUrls: ['home.css']

})
export class HomeComponent implements OnInit {
    private ideas: Array<Idea>;

    constructor(private route: ActivatedRoute,
                private db: IdeaDatabase,
                private alertService: AlertService,
                private ref: ChangeDetectorRef) {
    }

    public ngOnInit(): void {
        this.route.data.forEach((data: {ideas: Idea[]}) => {
            this.ideas = data.ideas
        });
    }

    public deleteIdea(index: number, idea: Idea): void {
        this.db.delete(idea).then((removed) => {
            if (removed) {
                this.ideas.splice(index, 1);
                this.alertService.showWarning(`idea "${idea.title}" removed`);
            }
        });
    }

    public loadFile(): void {
        dialog.showOpenDialog({
            properties: ['openFile'],
            filters: [
                {name: 'Data file', extensions: ['db']}
            ]
        }, (filePaths) => {
            if (filePaths && filePaths.length == 1) {
                this.db.loadDataBase(filePaths[0]);
                this.db.loaded.then(() => {
                    this.db.findAll().then((ideas) => {
                        this.ideas = ideas;
                        this.ref.detectChanges();
                    });
                });
            }
        });


    }
}
