import {Injectable} from "@angular/core";
import * as fs from "fs";
import * as uid from 'uid-safe';
import * as path from 'path';
import * as _ from "lodash";

const ID_FIELD: string = "_id";

@Injectable()
export class StorageService {
    private storage: {[id: string]: any;};
    private filename: string;
    private dirty: boolean;
    private name: string;

    //TODO: crear Emitters per els events de desa, carregar, insertar, elminiar, etc.

    public constructor() {
        this.storage = {};
        this.dirty = false;
    }

    private setFilename(filename: string): void {
        this.filename = filename;
        this.name = path.basename(filename, ".gio");
    }

    //load
    public load(filename: string): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!filename)
                throw new Error("invalid filename set! Use Storage.save('path/to/filename') to save it");

            this.setFilename(filename);

            fs.readFile(filename, (err, data) => {
                if (err) {
                    resolve();
                } else {
                    this.storage = JSON.parse(data.toString());
                    this.dirty = false;
                    resolve();
                }
            });
        });
    }

    //save
    public save(filename?: string): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!this.filename && !filename) {
                throw new Error("Storage not have any filename set! Use Storage.save('path/to/filename') to save it");
            }
            this.setFilename(filename || this.filename);

            fs.writeFile(this.filename, JSON.stringify(this.storage), err => {
                if (err)
                    reject(err);
                else {
                    this.dirty = false;
                    resolve();
                }
            });
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
                    this.dirty = true;
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

                if (!this.storage[id]) {
                    reject(new Error(`document with ${ID_FIELD} not exist.`))
                }

                let documentUpdated = this.storage[id];
                documentUpdated = Object.assign(documentUpdated, document);

                this.storage[id] = documentUpdated;
                this.dirty = true;
                resolve(Object.assign({}, documentUpdated));
            }
        });
    }

    public findAll(): Promise<any> {
        return new Promise((resolve, reject) => {
            let documents: Array<any> = [];
            for (let key in this.storage) {
                documents.push(this.storage[key]);
            }

            resolve(documents);
        })
    }


    public findOne(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            let document = this.storage[id];
            if (!document)
                reject(new Error(`Document ${id} not exist in storage`));
            else
                resolve(document);
        })
    }

    public deleteDocument(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!this.storage[id]) {
                reject(new Error(`Document ${id} not exist in storage`));
            } else {
                delete this.storage[id];
                this.dirty = true;
                resolve()
            }
        });
    }

    public isDirty(): boolean {
        return this.dirty;
    }

    public getName(): string {
        return this.name;
    }

    public findByField(value: any, fieldName: string): Promise<Array<any>> {
        return new Promise((resolve, reject) => {
            let documents: Array<any> = [];
            for (let key in this.storage) {
                let document = this.storage[key];
                if(!_.isString(document[fieldName])){
                    reject(new Error(`field "${fieldName}" is not string value`));
                    return;
                }
                let fieldValueNormalized = document[fieldName]? _.deburr(document[fieldName]).toLowerCase() : "";
                if (fieldValueNormalized.indexOf(_.deburr(value).toLowerCase()) !== -1) {
                    documents.push(Object.assign({}, document));
                }
            }

            resolve(documents);
        });
    }
}
