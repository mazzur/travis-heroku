import Dummy from './dummy';

describe('instance of Dummy class', () => {
    it('has dummy method that returns dummy text', () => {
        let dummy = new Dummy();

        expect(dummy.method()).toBe('some dummy text');
    });
});