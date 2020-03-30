import {getPricesStream} from "./api/prices";

export function collectPrices() {
  getPricesStream().subscribe(next => console.log(next));
}