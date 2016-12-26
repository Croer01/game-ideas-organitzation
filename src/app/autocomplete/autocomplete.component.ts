/**
 * Created by Adria on 21/08/2016.
 */
import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {Idea} from "../persistance/Idea";
import {StorageService} from "../../storage/storage.service";
const slash = require('slash');

@Component({
    moduleId: slash(module.id),
    selector: 'autocomplete',
    templateUrl: 'autocomplete.tmpl.html',
    styleUrls: ['autocomplete.css']
})
export class AutoCompleteComponent implements OnInit {
    private options: Idea[];
    private isFocus: Boolean;
    private selectedIndex: number;
    private inputModel: string;

    @Input()
    private showProperty: string;
    @Output()
    private onSelected = new EventEmitter<Idea>(false);
    @Output()
    private onChange = new EventEmitter<any>(false);

    constructor(private storage: StorageService) {
    }

    ngOnInit(): void {
        this.storage.findAll().then(options => this.options = options);
        this.isFocus = false;
        this.selectedIndex = 0;
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

    public getOptionContent(option: Idea): string {
        return this.showProperty ? option[this.showProperty] : option;
    }

    public selectOption(event: MouseEvent, index: number): void {
        if (event.button === 0) {
            this.selectedIndex = index;
            var optionSelected: Idea = this.options[this.selectedIndex];
            this.inputModel = this.getOptionContent(optionSelected);
            this.closeOptions();
            this.onSelected.emit(optionSelected);
        }

        event.preventDefault();
    }

    public searchOptions(): void {
        this.storage.findByField(this.inputModel, "title").then(options => this.options = options);
        this.selectedIndex = -1;
        this.openOptions();
        this.onChange.emit();
    }

    public moveCursor(event: KeyboardEvent): void {
        // PRESS UP ARROW
        if (event.keyCode == 38) {
            event.preventDefault();
            this.selectedIndex = Math.max(0, this.selectedIndex - 1);
        }

        // PRESS DOWN ARROW
        if (event.keyCode == 40) {
            event.preventDefault();
            this.selectedIndex = Math.min(this.options.length - 1, this.selectedIndex + 1);
        }

        // PRESS ENTER
        if (event.keyCode == 13) {
            var optionSelected: Idea = this.options[this.selectedIndex];
            event.preventDefault();
            this.inputModel = this.getOptionContent(optionSelected);
            this.closeOptions();
            this.onSelected.emit(optionSelected);
        }
    }
}
