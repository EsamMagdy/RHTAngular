import { Component } from "@angular/core";

@Component({
    selector: 'app-disconnected',
    templateUrl: './disconnected.component.html',
    styleUrls: ['./disconnected.component.css']
})
export class DisconnectedComponent {
    hidden = false;
    closeAlert() {
        this.hidden = true;
    }
    reloadPage(){
        location.reload();
    }
}