/**
 * Created by Adria on 21/08/2016.
 */
import {Component, OnInit, ChangeDetectorRef} from "@angular/core";
import {Idea} from "../persistance/Idea";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../alert/alert.service";
import {StorageService} from "../../storage/storage.service";

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
                private alertService: AlertService,
                private ref: ChangeDetectorRef,
                private  storage: StorageService) {
    }

    public ngOnInit(): void {
        this.route.data.forEach((data: {ideas: Idea[]}) => {
            this.ideas = data.ideas
        });
    }

    public deleteIdea(index: number, idea: Idea): void {
        this.storage.deleteDocument(idea._id).then(() => {
            this.ideas.splice(index, 1);
            this.alertService.showWarning(`idea "${idea.title}" removed`);
        });
    }

    public loadFile(): void {
        dialog.showOpenDialog({
            properties: ['openFile'],
            filters: [
                {name: 'Game Idea Organization file', extensions: ['gio']}
            ]
        }, (filePaths) => {
            if (filePaths && filePaths.length == 1) {
                this.storage.load(filePaths[0]).then(() => {
                    this.storage.findAll().then((ideas) => {
                        this.ideas = ideas;
                        this.ref.detectChanges();
                    });
                });
            }
        });
    }

    public saveFile():void{
        this.storage.save().then(() => {
            this.alertService.showSuccess(`${this.storage.getName()} saved`);
        })
    }
}
