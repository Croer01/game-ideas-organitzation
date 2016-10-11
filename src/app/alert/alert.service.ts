import {Injectable, ElementRef} from "@angular/core";
import {AlertComponent} from "./alert.component";
import {AlertType} from "./alert-type";

@Injectable()
export class AlertService {
    private alertElement: AlertComponent;

    public registerElement(element: AlertComponent): void {
        this.alertElement = element;
    }

    public showInfo(message: string) {
        this.alertElement.message = message;
        this.alertElement.setType(AlertType.INFO);
        this.alertElement.show();
    }

    public showSuccess(message: string) {
        this.alertElement.message = message;
        this.alertElement.setType(AlertType.SUCCESS);
        this.alertElement.show();
    }

    public showError(message: string) {
        this.alertElement.message = message;
        this.alertElement.setType(AlertType.ERROR);
        this.alertElement.show();
    }

    public showWarning(message: string) {
        this.alertElement.message = message;
        this.alertElement.setType(AlertType.WARNING);
        this.alertElement.show();
    }
}
