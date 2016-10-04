import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {routing} from './app.routing';

import {AppRootComponent} from "./app.component";
import {MainContentComponent} from "./main-content/main-content.component";
import {IdeaDatabase} from "./persistance/database.service";
import {AutoCompleteComponent} from "./autocomplete/autocomplete.component";


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        routing
    ],
    providers:[
        IdeaDatabase
    ],
    declarations: [
        AppRootComponent,
        MainContentComponent,
        AutoCompleteComponent
    ],
    bootstrap: [AppRootComponent]
})
export class AppModule {
}
