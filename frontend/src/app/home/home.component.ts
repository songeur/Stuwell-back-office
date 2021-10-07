﻿import { Component } from '@angular/core';

import { User } from '@app/_models';
import { ClientHttpService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    user: User;

    constructor(private accountService: ClientHttpService) {
        this.user = this.accountService.userValue;
    }
}