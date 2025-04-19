import { saveToken, getToken, removeToken } from '../../utils/auth';

describe('boundary', () => {
    test('TokenFunctionsComponent boundary saveToken function is defined and not empty', () => {
        expect(saveToken).toBeDefined();
        expect(saveToken.toString().length).toBeGreaterThan(0);
    });

    test('TokenFunctionsComponent boundary getToken function is defined and not empty', () => {
        expect(getToken).toBeDefined();
        expect(getToken.toString().length).toBeGreaterThan(0);
    });

    test('TokenFunctionsComponent boundary removeToken function is defined and not empty', () => {
        expect(removeToken).toBeDefined();
        expect(removeToken.toString().length).toBeGreaterThan(0);
    });
});
