import {Injectable} from "@angular/core";
import * as fs from "fs";
import * as uid from 'uid-safe';
import any = jasmine.any;

const ID_FIELD: string = "_id";

@Injectable()
export class StorageService {
    private storage: {[id: string]: any;};
    private filename: string;

    //TODO: crear Emitters per els events de desa, carregar, insertar, elminiar, etc.

    //create
    public constructor() {
        this.storage = {};
    }

    //load
    public load(filename: string): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!filename)
                throw new Error("invalid filename set! Use Storage.save('path/to/filename') to save it");

            this.filename = filename;

            fs.readFile(filename, (err, data) => {
                if (err) {
                    resolve();
                } else {
                    this.storage = JSON.parse(data.toString());
                    resolve();
                }
            });
        });
    }

    //save
    public save(filename?: string) {
        if (!this.filename && !filename) {
            throw new Error("Storage not have any filename set! Use Storage.save('path/to/filename') to save it");
        }

        this.filename = filename || this.filename;

        fs.writeFile(this.filename, JSON.stringify(this.storage), function (err) {
            if (err)
                throw err;

            //the save has been success!!!

        });
    }

    public saveDocument(document: any): Promise<any> {
        return new Promise((resolve, reject) => {
            debugger;
            if (document[ID_FIELD]) {
                this.updateDocument(document).then(resolve, reject);
            } else {
                uid(18, (err, id) => {
                    if (err) throw err;
                    let newDocument = {};
                    newDocument[ID_FIELD] = id;
                    newDocument = Object.assign(newDocument, document);
                    this.storage[id] = newDocument;
                    resolve(Object.assign({}, newDocument));
                })
            }
        });
    }

    public updateDocument(document: any): any {
        return new Promise((resolve, reject) => {

            if (!document[ID_FIELD]) {
                reject(new Error(`document not have ${ID_FIELD}. use "saveDocument(document) to save new document"`));
            }
            else {
                let id = document[ID_FIELD];

                if(!this.storage[id]){
                    reject(new Error(`document with ${ID_FIELD} not exist.`))
                }

                let documentUpdated = this.storage[id];
                documentUpdated = Object.assign(documentUpdated, document);

                this.storage[id] = documentUpdated;
                resolve(Object.assign({}, documentUpdated));
            }
        });
    }
}
