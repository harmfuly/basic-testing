import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import * as fs from 'fs';

jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  promises: {
    ...jest.requireActual('fs').promises,
    readFile: jest.fn(),
  },
  existsSync: jest.fn(),
}));

describe('doStuffByTimeout', () => {
  let setTimeoutSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.useFakeTimers();
    setTimeoutSpy = jest.spyOn(global, 'setTimeout');
  });

  afterEach(() => {
    jest.useRealTimers();
    setTimeoutSpy.mockRestore();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000; // 1 sec

    doStuffByTimeout(callback, timeout);

    jest.advanceTimersByTime(timeout);

    expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
    expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), timeout);
    expect(callback).toHaveBeenCalled();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000; // 1 sec

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout);

    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  let setIntervalSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.useFakeTimers();
    setIntervalSpy = jest.spyOn(global, 'setInterval');
  });

  afterEach(() => {
    jest.useRealTimers();
    setIntervalSpy.mockRestore();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const interval = 1000;

    doStuffByInterval(callback, interval);

    jest.advanceTimersByTime(interval);

    expect(setIntervalSpy).toHaveBeenCalledTimes(1);
    expect(setIntervalSpy).toHaveBeenCalledWith(expect.any(Function), interval);
    expect(callback).toHaveBeenCalledTimes(1);
  });
  
  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 1000;
  
    doStuffByInterval(callback, interval);
  
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(interval * 3);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile: string = 'file.txt';
    const joinMock = jest.spyOn(require('path'), 'join');

    await readFileAsynchronously(pathToFile);

    expect(joinMock).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const nonExistentFile = 'nonexistent.txt';
    (fs.existsSync as jest.Mock).mockReturnValue(false);

    const result = await readFileAsynchronously(nonExistentFile);

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const existingFile = 'existingfile.txt';
    const fileContent = 'Hello, World!';
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    jest.spyOn(fs.promises, 'readFile').mockResolvedValueOnce(Buffer.from(fileContent));

    const result = await readFileAsynchronously(existingFile);
    expect(result).toBe(fileContent);
  });
});