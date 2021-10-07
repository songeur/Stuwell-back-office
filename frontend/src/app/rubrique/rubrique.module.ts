import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CreateRubriqueComponent } from './create-rubrique/create-rubrique.component';
import { RubriqueRoutingModule } from './rubrique-routing.module';
import { DisplayRubriqueComponent } from './display-rubrique/display-rubrique.component';
import { SafeHtmlPipe } from '@app/rubrique/safe-html.pipe';
// Flexbox and CSS Grid (both)
import { FlexLayoutModule } from '@angular/flex-layout';
// Flexbox mode (only)
import { FlexModule } from '@angular/flex-layout/flex';
import { SousRubriqueComponent } from './sous-rubrique/sous-rubrique.component';
import {RouterModule} from '@angular/router';
import { EditRubriqueComponent } from './edit-rubrique/edit-rubrique.component';

@NgModule({
  declarations: [CreateRubriqueComponent, DisplayRubriqueComponent, SafeHtmlPipe, SousRubriqueComponent, EditRubriqueComponent],
  imports: [
    CommonModule,
    RubriqueRoutingModule,
    RouterModule,
    AngularEditorModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    FlexModule
  ],
  exports: [
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
})
export class RubriqueModule { }
