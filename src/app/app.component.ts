import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'GridAngular';
    url = "https://www.stonewall.org.uk/sites/default/files/styles/basic_page_hero/public/trans_rights-logo_tw-post-1024x512.png?itok=XjhrJma7";
    xLetters = false;
    yLetters = true;
}
