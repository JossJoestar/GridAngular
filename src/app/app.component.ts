import { Component, OnInit } from '@angular/core';
import { GridLibService } from 'projects/grid-lib/src/public-api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'GridAngular';
    url = "https://www.stonewall.org.uk/sites/default/files/styles/basic_page_hero/public/trans_rights-logo_tw-post-1024x512.png?itok=XjhrJma7";
    cellsInXAxis = 5;
    cellsInYAxis = 7;

    constructor(
        private gridService: GridLibService
    ) { }

    ngOnInit() {
        this.gridService.data.subscribe(m => console.log(m));
    }
    
    receiveMessage($event: any) {
        console.log($event)
    }
}
