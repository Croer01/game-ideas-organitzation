/**
 * Created by Adria on 21/08/2016.
 */
import {Component, OnInit, Input} from "@angular/core";
import {IdeaDatabase} from "../database.service";
const slash = require('slash');

@Component({
    moduleId: slash(module.id),
    selector: 'autocomplete',
    templateUrl: 'autocomplete.tmpl.html'
})
export class AutoCompleteComponent implements OnInit {
    private newIdea: any;
    private options: Array<any>;
    private isFocus: Boolean;

    @Input()
    private showProperty : string;

    constructor(private db: IdeaDatabase) {
    }

    ngOnInit(): void {
        this.newIdea = {};
        this.db.loaded.then(() => this.db.findAll().then((ideas)=>this.options = ideas));
        this.closeOptions();
    }

    public closeOptions() {
        this.isFocus = false;
    }


    public openOptions() {
        this.db.findAll().then((ideas)=> {
            this.options = ideas;
            this.isFocus = true;
        });
    }

    public getOptionContent(option) {
        return this.showProperty? option[this.showProperty] : option;

    }

}
