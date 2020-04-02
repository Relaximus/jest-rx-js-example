import {TestScheduler} from 'rxjs/testing'
import {getPricesStream} from "./api/prices";
import {mocked} from 'ts-jest/utils';
import {of} from "rxjs";
import {flatDiscount} from "./services/discounts";
import { expect as chaiExpect} from 'chai';
import {catchError} from "rxjs/operators";

jest.mock("./api/prices");

describe('simple tests', () => {
    it('dummy test, showing mocked syntax', async (done) => {
        mocked(getPricesStream).mockReturnValueOnce(of(1, 2, 3, 4, 5));
        const res: number[] = [];
        getPricesStream().subscribe({
            next: (next) => res.push(next),
            complete: () => {
                expect(res).toEqual([1, 2, 3, 4, 5]);
                done();
            }
        });
    });

    it('mockImplementation works, even nested in the service', async (done) => {
        mocked(getPricesStream).mockReturnValueOnce( of(1, 2, 3, 4, 5));
        const res: number[] = [];
        flatDiscount().subscribe({
            next: (next) => res.push(next),
            complete: () => {
                expect(res).toEqual([1, 2, 3, 4, 5].map(v => 0.9 * v));
                done();
            }
        });
    });

    it('test using TestScheduler to tests complicated time related staff', () =>{
        const scheduler = new TestScheduler((actual, expected) => {
            chaiExpect(actual).to.deep.equal(expected)
        });

        scheduler.run(helpers => {
            const {expectObservable, cold} = helpers;

            mocked(getPricesStream).mockReturnValueOnce(cold('1-2-3-#', {
                1: 100,
                2: 200,
                3: 300,
            }));


            // let's imagine, we are building stream with error handling
            const stream = flatDiscount().pipe(
                catchError(() => cold('a-b',{a: 'A', b: 'B'}))
            );
            expectObservable(stream).toBe('1-2-3-4-5',{
                1: 90,
                2: 180,
                3: 270,
                4: 'A',
                5: 'B'
            });
        })
    })
});
