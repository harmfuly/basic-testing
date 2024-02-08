import { BankAccount, InsufficientFundsError, SynchronizationFailedError, TransferFailedError, getBankAccount } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 1000;
    const account = getBankAccount(initialBalance);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should withdraw money', () => {
    const initialBalance = 2000;
    const withdrawalAmount = 1500;
    const account = getBankAccount(initialBalance);
    account.withdraw(withdrawalAmount);
    expect(account.getBalance()).toBe(initialBalance - withdrawalAmount);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 1500;
    const withdrawalAmount = 2000;
    const account = getBankAccount(initialBalance);
    expect(() => account.withdraw(withdrawalAmount)).toThrowError(InsufficientFundsError);
  });

  test('should transfer money', () => {
    const initialBalanceSender = 500;
    const initialBalanceReceiver = 200;
    const transferAmount = 200;
    const sender = getBankAccount(initialBalanceSender);
    const receiver = getBankAccount(initialBalanceReceiver);
    sender.transfer(transferAmount, receiver);
    expect(sender.getBalance()).toBe(initialBalanceSender - transferAmount);
    expect(receiver.getBalance()).toBe(initialBalanceReceiver + transferAmount);
  });

  test('should throw error when transferring to the same account', () => {
    const initialBalance = 500;
    const transferAmount = 200;
    const account = getBankAccount(initialBalance);
    expect(() => account.transfer(transferAmount, account)).toThrowError(TransferFailedError);
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalance = 500;
    const transferAmount = 700;
    const account = getBankAccount(initialBalance);
    expect(() => account.transfer(transferAmount, account)).toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    const initialBalance = 100;
    const depositAmount = 900;
    const account = getBankAccount(initialBalance);
    account.deposit(depositAmount);
    expect(account.getBalance()).toBe(initialBalance + depositAmount);
  });


  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = new BankAccount(0);
    const balance = await account.fetchBalance();
    expect(typeof balance).toBe('number');
    expect(balance).not.toBeNull();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const balance = 500;
    jest.spyOn(BankAccount.prototype, 'fetchBalance').mockResolvedValue(balance);
    const account = new BankAccount(0);
    await account.synchronizeBalance();
    expect (typeof account.getBalance()).toBe('number');
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(0);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(null);
    await expect(account.synchronizeBalance()).rejects.toThrowError(SynchronizationFailedError);
  });
});
