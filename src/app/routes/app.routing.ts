import {Route, Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "../main-content/home.component";
import {NewIdeaComponent} from "../new-idea/new-idea.component";
import {IdeasResolve} from "./IdeasResolve";


const appRoutes:Routes = [
    <Route>{
        path: 'new-idea',
        component: NewIdeaComponent
    },
    <Route>{
        path: '',
        component: HomeComponent,
        resolve:{
            'ideas': IdeasResolve
        }
    }
];

export const routing = RouterModule.forRoot(appRoutes);
