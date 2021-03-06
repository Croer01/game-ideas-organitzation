import {Route, Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "../home/home.component";
import {NewIdeaComponent} from "../new-idea/new-idea.component";
import {IdeasResolve} from "./IdeasResolve";


const appRoutes:Routes = [
    <Route>{
        path: 'new-idea',
        component: NewIdeaComponent,
        resolve:{
            'ideas': IdeasResolve
        }
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
