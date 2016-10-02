/**
 * Created by Adria on 21/08/2016.
 */
import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {IdeaDatabase} from "../persistance/database.service";
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
    private selectedOption: string;
    @Input()
    private showProperty: string;
    @Output()
    private onSelected = new EventEmitter(false);

    constructor(private db: IdeaDatabase) {
    }

    ngOnInit(): void {
        this.newIdea = {};
        this.db.loaded.then(() => this.db.findAll().then((options)=>this.options = options));
        this.isFocus = false;
    }

    public closeOptions(): void {
        this.isFocus = false;
        this.options = [];
    }

    public openOptions(): void {
        if (!this.isFocus) {
            this.isFocus = true;
        }
    }

    public getOptionContent(option: any): string {
        return this.showProperty ? option[this.showProperty] : option;
    }

    public selectOption(event: MouseEvent, option: any): void {
        if (event.button === 0) {
            this.selectedOption = this.getOptionContent(option);
            this.closeOptions();
            this.onSelected.emit(option);
        }

        event.preventDefault();
    }

    public searchOptions(): void {
        this.db.findByTitle(this.selectedOption).then((options)=>this.options = options);
        this.openOptions();
    }
}
