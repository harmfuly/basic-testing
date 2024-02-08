import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule = jest.requireActual<typeof import('./index')>('./index');
  return {
    __esModule: true,
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const consoleLogMock = jest.spyOn(console, 'log').mockImplementation();
    mockOne();
    mockTwo();
    mockThree();
    expect(consoleLogMock).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    const consoleLogMock = jest.spyOn(console, 'log').mockImplementation();
    unmockedFunction();
    expect(consoleLogMock).toHaveBeenCalled();
  });
});
