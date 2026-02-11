import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { AquaStadeComponent } from './aqua-stade.component';

@NgModule({
    declarations: [
        AquaStadeComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', component: AquaStadeComponent }
        ]),
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatDividerModule,
        MatTabsModule
    ]
})
export class AquaStadeModule {
}
