import { Component, OnInit } from '@angular/core';
import { GridLibService } from 'projects/grid-lib/src/public-api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'GridAngular';
    url = "https://c4.wallpaperflare.com/wallpaper/52/362/326/anime-picture-in-picture-purple-eyes-animal-ears-transgender-hd-wallpaper-preview.jpg";
    // url = "../assets/anime-picture-in-picture-purple-eyes-animal-ears-transgender-hd-wallpaper-preview.jpg"
    cellsInXAxis = 5;
    cellsInYAxis = 7;

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
