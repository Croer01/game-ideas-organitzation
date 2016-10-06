/**
 * Created by Adria on 21/08/2016.
 */
import {Component, OnInit} from "@angular/core";
import {Idea} from "../persistance/Idea";
import {ActivatedRoute} from "@angular/router";
const slash = require('slash');

@Component({
    moduleId: slash(module.id),
    selector: 'home',
    templateUrl: 'home.tmpl.html'
})
export class HomeComponent implements OnInit {
    private ideas: Array<Idea>;

    constructor(
        private route: ActivatedRoute,
    ){}

    public ngOnInit(): void {
        this.route.data.forEach((data:{ideas:Idea[]})=>{
            this.ideas = data.ideas
        });
    }
}
