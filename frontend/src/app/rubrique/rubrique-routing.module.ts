import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateRubriqueComponent } from './create-rubrique/create-rubrique.component';
import { DisplayRubriqueComponent } from './display-rubrique/display-rubrique.component';
import { EditRubriqueComponent } from './edit-rubrique/edit-rubrique.component';
import { SousRubriqueComponent } from './sous-rubrique/sous-rubrique.component';

const routes: Routes = [
  { path: '', component: DisplayRubriqueComponent },
  { path: 'create', component: CreateRubriqueComponent },
  { path: 'edit/:id', component: EditRubriqueComponent },
  { path: 'create-sous-rubrique', component: SousRubriqueComponent },
  { path: '**', component: DisplayRubriqueComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RubriqueRoutingModule { }
