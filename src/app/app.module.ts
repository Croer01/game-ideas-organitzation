import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {routing} from './app.routing';

import {AppRootComponent} from "./app.component";
import {MainContentComponent} from "./main-content/main-content.component";
import {IdeaDatabase} from "./database.service";


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
        MainContentComponent
    ],
    bootstrap: [AppRootComponent]
})
export class AppModule {
}
