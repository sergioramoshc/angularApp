/* ANGULAR */
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

/* INTERNO */

/* TERCEIROS */

const tokenKey = 'defaultTokenKey';
const refreshKey = 'defaultRefreshTokenKey';
const userKey = 'defaultUserKey';

@Injectable({
    providedIn: 'root'
})

export class UserService {

    constructor(
    ) { }

    getTokenKey() {
        return localStorage.getItem(tokenKey);
    }

    setTokenKey(token: string) {
        localStorage.setItem(tokenKey, token);
    }

    getRefreshTokenKey() {
        return localStorage.getItem(refreshKey);
    }

    setRefreshTokenKey(refresh: string) {
        localStorage.setItem(refreshKey, refresh);
    }

    getUserKey() {
        return localStorage.getItem(userKey);
    }

    setUserKey(user: string) {
        localStorage.setItem(userKey, user);
    }

    limpaKeys() {
        localStorage.clear();
    }
}