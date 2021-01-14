/* ANGULAR */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/* INTERNO */

/* TERCEIROS */

declare let $: any;

@Injectable({
    providedIn: 'root'
})

export class UtilsService {

    //injeção de dependencia angular
    constructor(
    ) { }

    async getIp(): Promise<string> {
        var info = await $.getJSON("https://api.ipify.org/?format=json");
        return info.ip;
    }

    tratarData(data: Date): string {
        // Trata a o ano, mês e dia
        var auxData = `${data.getFullYear()}-${(data.getMonth() + 1).toString().padStart(2, '0')}-${data.getDate().toString().padStart(2, '0')} 00:00:00`

        return auxData;
    }
}
