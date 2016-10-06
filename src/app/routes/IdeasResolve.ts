import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {Idea} from "../persistance/Idea";
import {IdeaDatabase} from "../persistance/database.service";

@Injectable()
export class IdeasResolve implements Resolve<Idea[]> {
    constructor(private db: IdeaDatabase) {
    }

    resolve(route: ActivatedRouteSnapshot): Promise<Idea[]> {
        return this.db.loaded.then(() => {
            return this.db.findAll();
        });
    }

}
