import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.less'],
})
export class AlertComponent implements OnInit {
  @Input() message: string;
  @Input() severity: string;
  @Input() summary: string;
  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.showError();
  }
  showError() {
    setTimeout(() => {
      this.messageService.add({
        key: 'tc',
        severity: this.severity,
        summary: this.summary,
        detail: this.message,
      });
    });
  }
}
