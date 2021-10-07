import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// Flexbox and CSS Grid (both)
import { FlexLayoutModule } from '@angular/flex-layout';
// Flexbox mode (only)
import { FlexModule } from '@angular/flex-layout/flex';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { SafeHtmlPipe } from '@app/temoignage/safe-html.pipe';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CreateTemoignageComponent } from './create-temoignage/create-temoignage.component';
import { DisplayTemoignageComponent } from './display-temoignage/display-temoignage.component';
import { TemoignageRoutingModule } from './temoignage-routing.module';
import { EditTemoignageComponent } from './edit-temoignage/edit-temoignage.component';

@NgModule({
  declarations: [CreateTemoignageComponent, DisplayTemoignageComponent, SafeHtmlPipe, EditTemoignageComponent],
  imports: [
    CommonModule,
    TemoignageRoutingModule,
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
    MatButtonModule,
  ],
})
export class TemoignageModule { }
