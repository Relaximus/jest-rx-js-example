import {getPricesStream} from "../api/prices";
import {map} from "rxjs/operators";

const DISCOUNT = 0.1;

export function flatDiscount() {
    return getPricesStream().pipe(
        map(price => (1 - DISCOUNT) * price)
    );
}