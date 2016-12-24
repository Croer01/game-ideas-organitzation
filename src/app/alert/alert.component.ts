/**
 * Created by Adria on 21/08/2016.
 */
import {Component, Input, ElementRef} from "@angular/core";
import {AlertService} from "./alert.service";
import {AlertType} from "./alert-type";
const slash = require('slash');

@Component({
    moduleId: slash(module.id),
    selector: 'alert',
    templateUrl: 'alert.tmpl.html',
    styleUrls: ['alert.css']
})
export class AlertComponent {
    @Input()
    public message: string;

    private ngClass: string[];
    private timeout: number;

    constructor(private alert: AlertService) {
        alert.registerElement(this);
        this.ngClass = ['', ''];
    }

    public setType(type: AlertType): void {

        switch (type) {
            case AlertType.SUCCESS:
                this.ngClass[0] = 'alert-success';
                break;
            case AlertType.WARNING:
                this.ngClass[0] = 'alert-warning';
                break;
            case AlertType.ERROR:
                this.ngClass[0] = 'alert-danger';
                break;
            default:
                this.ngClass[0] = 'alert-info';
                break;
        }
    }

    public show(): void {
        this.ngClass[1] = '';
        if (this.timeout)
            clearTimeout(this.timeout);

        setTimeout(()=> {
            this.ngClass[1] = 'alert-show';
            if (this.timeout)
                clearTimeout(this.timeout);
            this.timeout = Number(setTimeout(()=> {
                this.ngClass[1] = '';
                this.timeout = null;
            }, 5000));
        },200);
    }
}
