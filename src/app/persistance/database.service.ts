import {Injectable} from "@angular/core";
import * as Datastore from "nedb"
import {Idea} from "./Idea";

@Injectable()
export class IdeaDatabase {
    private db: any;
    public loaded: Promise<boolean>;

    constructor() {
        this.loadDataBase(__dirname + '/data.db')
    }

    public loadDataBase(filename : string) : void{
        this.db = new Datastore({filename: filename});
        this.loaded = new Promise((resolve, reject) => {
            this.db.loadDatabase((err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    }

    public findAll(): Promise<Idea[]> {
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

    public insert(idea): Promise<Idea> {
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

    public findByTitle(query: string): Promise<Idea[]> {
        var promise: Promise<Idea[]>;
        if (query) {
            promise = new Promise<Idea[]>((resolve, reject) => {
                this.db.find({title: new RegExp(query)}, (err, ideas) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(ideas);
                    }
                });
            });
        } else {
            promise = this.findAll();
        }

        return promise;
    }

    public delete(idea: Idea): Promise<Boolean> {
        return new Promise<Boolean>((resolve, reject) => {
            this.db.remove({_id: idea._id}, {}, (err, numRemoved) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(numRemoved > 0);
                }
            });
        });
    }
}
