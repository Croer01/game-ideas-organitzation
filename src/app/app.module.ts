import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {routing} from './routes/app.routing';

import {AppRootComponent} from "./app.component";
import {HomeComponent} from "./home/home.component";
import {AutoCompleteComponent} from "./autocomplete/autocomplete.component";
import {NewIdeaComponent} from "./new-idea/new-idea.component";
import {IdeasResolve} from "./routes/IdeasResolve";
import {AlertComponent} from "./alert/alert.component";
import {AlertService} from "./alert/alert.service";
import {StorageModule} from "../storage/storage.module";


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        StorageModule
    ],
    providers:[
        IdeasResolve,
        AlertService
    ],
    declarations: [
        AppRootComponent,
        HomeComponent,
        NewIdeaComponent,
        AutoCompleteComponent,
        AlertComponent
    ],
    bootstrap: [AppRootComponent]
})
export class AppModule {
}
