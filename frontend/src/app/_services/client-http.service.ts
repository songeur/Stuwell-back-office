import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/_models';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Article } from '../_models/article';
import { Rubrique } from '../_models/rubrique';

@Injectable({ providedIn: 'root' })
export class ClientHttpService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;
    baseUri: string = 'http://localhost:4000/api';

    constructor(private router: Router,
        private http: HttpClient) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(user_login, user_pass) {
        return this.http.post<User>(`${this.baseUri}/users/authenticate`, { user_login, user_pass })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user 
                // logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(user: User) {
        return this.http.post(`${this.baseUri}/users/register`, user);
    }

    getAll() {
        return this.http.get<User[]>(`${this.baseUri}/users`);
    }

    getById(id: string) {
        return this.http.get<User>(`${this.baseUri}/users/${id}`);
    }

    update(id, params) {
        return this.http.put(`${this.baseUri}/users/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue._id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${this.baseUri}/users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue._id) {
                    this.logout();
                }
                return x;
            }));
    }

    // ################################### Article services ################################### //
    createArticle(dataArticle) {
        return this.http.post<Article>(`${this.baseUri}/article/create`, { dataArticle });
    }

    getAllArticle() {
        return this.http.get<Article[]>(`${this.baseUri}/article`).pipe(
            map(val => {
                return val.map(v => v.data)
            })
        )
    }

    // ################################### Rubriques services  ################################### //
    createRubrique(dataRubrique) {
        return this.http.post<Rubrique>(`${this.baseUri}/rubrique/create`, dataRubrique);
    }

    getAllRubrique() {
        return this.http.get<Rubrique[]>(`${this.baseUri}/rubrique`);
    }

    getRubriqueById(id) {
        return this.http.get<Rubrique>(`${this.baseUri}/rubrique/${id}`);
    }

    updateRubrique(id, params) {
        return this.http.put<any[]>(`${this.baseUri}/rubrique/${id}`, params);
    }

    deleteRubrique(id: string) {
        return this.http.delete(`${this.baseUri}/rubrique/${id}`);
    }

    createSousRubrique(dataSRubrique) {
        return this.http.post<any>(`${this.baseUri}/sous-rubrique/create`, { dataSRubrique });
    }

    getAllSousRubrique() {
        return this.http.get<any[]>(`${this.baseUri}/sous-rubrique`);
    }

    deleteSRubrique(id: string) {
        return this.http.delete(`${this.baseUri}/sous-rubrique/${id}`);
    }

    // ################################### Témoignages services  ################################### //
    createTemoignage(dataTemoignage) {
        return this.http.post<any>(`${this.baseUri}/temoignage/create`, dataTemoignage);
    }

    getTemoignageById(id) {
        return this.http.get<any>(`${this.baseUri}/temoignage/${id}`);
    }

    updateTemoignage(id, params) {
        return this.http.put<any[]>(`${this.baseUri}/temoignage/${id}`, params);
    }

    getAllTemoignage() {
        return this.http.get<any[]>(`${this.baseUri}/temoignage`);
    }

    deleteTemoignage(id: string) {
        return this.http.delete(`${this.baseUri}/temoignage/${id}`);
    }

    // ################################### Acteurs services  ################################### //
    createActeur(dataActeur) {
        return this.http.post<any>(`${this.baseUri}/acteur/create`, dataActeur);
    }

    getActeurById(id) {
        return this.http.get<any>(`${this.baseUri}/acteur/${id}`);
    }

    getAllActeur() {
        return this.http.get<any[]>(`${this.baseUri}/acteur`);
    }

    updateActeur(id, params) {
        return this.http.put<any[]>(`${this.baseUri}/acteur/${id}`, params);
    }

    deleteActeur(id: string) {
        return this.http.delete(`${this.baseUri}/acteur/${id}`);
    }
}