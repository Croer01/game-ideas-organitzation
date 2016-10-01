/**
 * Created by Adria on 21/08/2016.
 */
import {Component, OnInit, Input} from "@angular/core";
import {IdeaDatabase} from "../database.service";
const slash = require('slash');

@Component({
    moduleId: slash(module.id),
    selector: 'autocomplete',
    templateUrl: 'autocomplete.tmpl.html',
    styleUrls: ['autocomplete.css']
})
export class AutoCompleteComponent implements OnInit {
    private newIdea: any;
    private options: Array<any>;
    private isFocus: Boolean;
    private autocompleteInput: string;
    @Input()
    private showProperty: string;

    constructor(private db: IdeaDatabase) {
    }

    ngOnInit(): void {
        this.newIdea = {};
        this.db.loaded.then(() => this.db.findAll().then((ideas)=>this.options = ideas));
        this.closeOptions();
    }

    public closeOptions(): void {
        this.isFocus = false;
    }


    public openOptions(): void {
        if (!this.isFocus) {
            this.db.findAll().then((ideas)=> {
                this.options = ideas;
                this.isFocus = true;
            });
        }
    }

    public getOptionContent(option: any): string {
        return this.showProperty ? option[this.showProperty] : option;

    }

    public selectOption(event: MouseEvent, option: any): void {
        if (event.button === 0) {
            this.autocompleteInput = this.getOptionContent(option);
            this.closeOptions();
        }

        event.preventDefault();
    }

}
