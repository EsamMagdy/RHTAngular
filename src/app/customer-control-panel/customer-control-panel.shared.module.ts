import { SharedModule } from 'src/app/shared/modules/shared.module';
import { CommonModule } from '@angular/common';
import { MobileUserMenuComponent } from './mobile-user-menu/mobile-user-menu.component';
import { NgModule } from "@angular/core";

@NgModule({
    declarations:[
        MobileUserMenuComponent
    ],
    imports:[
        CommonModule,
        SharedModule
    ],
    exports:[
        MobileUserMenuComponent
    ]
})
export class CustomerControlPanelSharedModule{}