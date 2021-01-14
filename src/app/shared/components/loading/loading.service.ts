import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    loadindSubject: Subject<boolean> = new Subject<boolean>();

    getLoading() {
        return this.loadindSubject
            .asObservable()
            .pipe(startWith(false));
    }

    start() {
        this.loadindSubject.next(true);
    }

    stop() {
        this.loadindSubject.next(false);
    }
}