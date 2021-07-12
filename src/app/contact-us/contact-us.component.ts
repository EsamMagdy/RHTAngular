import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactUsInterface } from './contact-us.model';
import { ContactUsService } from './contact-us.service';
import { FooterLoaderService } from '../shared/services/footerLoaderAfterView.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  constructor(private footerLoaderService: FooterLoaderService) {
    this.footerLoaderService.footer.emit();
  }
  ngOnInit(): void {
  }
 
}
