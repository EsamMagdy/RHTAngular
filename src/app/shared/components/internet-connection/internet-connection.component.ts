import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ConnectionService } from "ng-connection-service";
import { CheckConnectionService } from "../../services/checkConnection.service";

@Component({
    selector: 'app-internet-connection',
    templateUrl: './internet-connection.component.html',
    styleUrls: ['./internet-connection.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class InternetConnectionComponent implements OnInit {
    status = 'ONLINE';
    isConnected: boolean;
    hiddenConnected = false;
    hiddenDisConnected = false;
    firstTimeHidden = true;
    displayDisconnectedForFirstTime = true;
    constructor(private connectionService: ConnectionService,
        private checkConnection: CheckConnectionService) {

    }
    ngOnInit(): void {
        this.connectionService.monitor().subscribe(isConnected => {
            this.isConnected = isConnected;
            this.firstTimeHidden = false;
            this.hiddenConnected = false;
            if (isConnected) {
                this.hiddenDisConnected = true;
                setTimeout(() => {
                    this.hiddenConnected = true;
                    location.reload();
                }, 5000);
            } else {
                this.hiddenDisConnected = false;
            }
        });

        this.checkConnection.isConnected.subscribe(isConnected => {
            this.isConnected = isConnected;
            this.firstTimeHidden = false;
            this.hiddenConnected = false;
            if (isConnected) {
                this.hiddenDisConnected = true;
                setTimeout(() => {
                    this.hiddenConnected = true;
                    location.reload();
                }, 5000);
            } else {
                this.hiddenDisConnected = false;
            }
        })
    }
}