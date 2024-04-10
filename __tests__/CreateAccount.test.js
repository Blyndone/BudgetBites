import { checkForm } from '../src/components/CreateAccount';

describe('Valid Username / Password', () => {
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
  test('Check Wrong Email Form ', () => {
    expect(
      checkForm('username', 'emailgmailcom', 'password', 'password'),
    ).not.toBe('');
  }),
    test('Check Passwords Match ', () => {
      expect(
        checkForm('username', 'email@gmail.com', 'password', 'pa$$word'),
      ).not.toBe('');
    }),
    test('Check Password Length ', () => {
      expect(checkForm('username', 'email@gmail.com', 'pass', 'pass')).not.toBe(
        '',
      );
    });
});
