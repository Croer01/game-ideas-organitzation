import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot} from "@angular/router";
import {Idea} from "../persistance/Idea";
import {StorageService} from "../../storage/storage.service";

@Injectable()
export class IdeasResolve implements Resolve<Idea[]> {
    constructor(private storage: StorageService) {
    }

    resolve(route: ActivatedRouteSnapshot): Promise<Idea[]> {
        return this.storage.findAll();
    }

}
