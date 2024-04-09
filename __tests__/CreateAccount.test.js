import { checkForm } from '../src/components/CreateAccount';

describe('check form data', () => {
  test('check vaild inputs ', () => {
    expect(
      checkForm('username', 'email@gmail.com', 'password', 'password'),
    ).toBe('');
  }),
    test('Check Short Username ', () => {
      expect(
        checkForm('user', 'email@gmail.com', 'password', 'password'),
      ).not.toBe('');
    });
  test('Check Wrong Email ', () => {
    expect(
      checkForm('username', 'emailgmailcom', 'password', 'password'),
    ).not.toBe('');
  }),
    test('Check Different Passwords ', () => {
      expect(
        checkForm('username', 'email@gmail.com', 'password', 'pa$$word'),
      ).not.toBe('');
    });
});
