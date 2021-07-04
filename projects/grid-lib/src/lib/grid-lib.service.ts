import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ICell } from './cell.interface';


@Injectable({
    providedIn: 'root'
})
export class GridLibService {

    private _messageSource: BehaviorSubject<ICell[]> = new BehaviorSubject<ICell[]>([]);
    data = this._messageSource.asObservable();

    constructor() { }
    
    getDataCellList(cellList: ICell[]) {
        this._messageSource.next(cellList);
    }
}
