import {Injectable} from "@angular/core";
import * as Datastore from "nedb"

@Injectable()
export class IdeaDatabase {
    private db: any;
    public loaded: Promise;

    constructor() {
        this.db = new Datastore({filename: __dirname + "/data.db"});
        this.loaded = new Promise((resolve,reject)=>{
            this.db.loadDatabase((err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    public findAll(): Promise<Array> {
        return new Promise((resolve, reject) => {
            this.db.find({}, (err, ideas) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(ideas);
                }
            });
        });
    }

    public insert(idea): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.insert(idea, (err, newIdea) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(newIdea);
                }
            });
        });
    }

}
