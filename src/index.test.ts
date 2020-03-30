import {TestScheduler} from 'rxjs/testing'
import {getPricesStream} from "./api/prices";
import {mocked} from 'ts-jest/utils';
import {of} from "rxjs";
import {flatDiscount} from "./services/discounts";

const TS = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
});

jest.mock("./api/prices");

describe('simple tests', () => {
    it('my custom stream without TestScheduler', async (done) => {
        mocked(getPricesStream).mockImplementation(() => of(1, 2, 3, 4, 5));
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
        mocked(getPricesStream).mockImplementation(() => of(1, 2, 3, 4, 5));
        const res: number[] = [];
        flatDiscount().subscribe({
            next: (next) => res.push(next),
            complete: () => {
                expect(res).toEqual([1, 2, 3, 4, 5].map(v => 0.9 * v));
                done();
            }
        });
    });
});
