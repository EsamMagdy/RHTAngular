import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class GetSignature {
    constructor() { }



    getSignature(url: string, key: number) {
        let x = url.split('/').length;
        let y = url.split('?').length;

        // x = parseFloat(x);
        // y = parseFloat(y);
        // key = parseFloat(key);

        var portion1 = 2 * key;
        portion1 = portion1 + x;
        portion1 = portion1 + y;
        portion1 = portion1 + 8;

        var portion2 = key + x;
        portion2 = portion2 - y;
        portion2 = portion2 - 2;

        var portion3 = portion1 + portion2;
        portion3 = portion3 + 5;

        var portion4 = x + y;
        var sign = portion3 + portion4;
        //var sign = (((((((2 * key * x) + y) + 8) * (((key + x) - y) - 2)) * key) + 5) * (x + y));
        return sign.toString();
    }
}