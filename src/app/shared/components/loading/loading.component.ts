import { Component, OnInit } from '@angular/core';
import { LoadingService } from './loading.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'chronos-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

    loading$: Observable<boolean>;
    constructor(private loadingService: LoadingService) { }

    ngOnInit(): void {
        this.loading$ = this.loadingService
            .getLoading();            
    }
}
