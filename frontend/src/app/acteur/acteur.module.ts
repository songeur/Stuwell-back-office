import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateActeurComponent } from './create-acteur/create-acteur.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexModule } from '@angular/flex-layout/flex';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ActeurRoutingModule } from './acteur-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { DisplayActeurComponent } from './display-acteur/display-acteur.component';
import { SafeHtmlPipe } from '@app/acteur/safe-html.pipe';
import { EditActeurComponent } from './edit-acteur/edit-acteur.component';


@NgModule({
  declarations: [CreateActeurComponent, DisplayActeurComponent, SafeHtmlPipe, EditActeurComponent],
  imports: [
    CommonModule,
    ActeurRoutingModule,
    RouterModule,
    AngularEditorModule,
    FlexModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ],
  exports: [
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class ActeurModule { }
