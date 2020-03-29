import { doSomeStuff } from './index';

describe('simple tests', () => {
  it('yes, first test', () => {
    const res = doSomeStuff('', '', ['']);
    expect(res).toBeTruthy();
  });
});
