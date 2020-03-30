import {of} from 'rxjs';
import {map,shareReplay} from 'rxjs/operators'

const prices$ = of(1,2,3,4,5).pipe(
    map(n => Math.random() * 100),
);

export const getPricesStream = () => prices$;