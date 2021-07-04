import { Component, OnInit } from '@angular/core';
import { GridLibService } from 'projects/grid-lib/src/public-api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'GridAngular';
    url = "https://images.unsplash.com/photo-1606425272073-6b1ea73c8557?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=667&q=80";
    rgba = "rgba(0,255,0,.5)"
    constructor(
        private gridService: GridLibService
    ) { }

    ngOnInit() {
        // this.gridService.data.subscribe(m => console.log(m));
    }

    receiveMessage($event: any) {
        console.log($event);
    }
}
