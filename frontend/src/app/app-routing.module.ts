import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';

//Lazy loaded modules
const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const rubriqueModule = () => import('./rubrique/rubrique.module').then(x => x.RubriqueModule);
const temoignageModule = () => import('./temoignage/temoignage.module').then(x => x.TemoignageModule);
const acteurModule = () => import('./acteur/acteur.module').then(x => x.ActeurModule);

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'acceuil', component: HomeComponent },
    { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },
    { path: 'rubrique', loadChildren: rubriqueModule },
    { path: 'temoignage', loadChildren: temoignageModule },
    { path: 'acteur', loadChildren: acteurModule },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }