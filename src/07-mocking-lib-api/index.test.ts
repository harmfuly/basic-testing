import axios from 'axios';
import { throttledGetDataFromApi } from './index';
import { THROTTLE_TIME } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const axiosClient = {
      get: jest.fn().mockResolvedValue({ data: 'testData' }),
    };
    (axios.create as jest.Mock).mockReturnValue(axiosClient);

    const throttledFn = throttledGetDataFromApi('/posts');
    jest.advanceTimersByTime(THROTTLE_TIME);

    await throttledFn;

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com'
    });
  });

  test('should perform request to correct provided url', async () => {
    const axiosClient = {
      get: jest.fn().mockResolvedValue({ data: 'testData' }),
    };
    (axios.create as jest.Mock).mockReturnValue(axiosClient);

    const throttledFn = throttledGetDataFromApi('/posts');
    jest.advanceTimersByTime(THROTTLE_TIME);

    await throttledFn;

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com'
    });

    expect(axiosClient.get).toHaveBeenCalledWith('/posts');
  });

  test('should return response data', async () => {
    const expectedData = 'testData';
    const axiosClient = {
      get: jest.fn().mockResolvedValue({ data: 'testData' }),
    };
    (axios.create as jest.Mock).mockReturnValue(axiosClient);

    const throttledFn = throttledGetDataFromApi('/posts');
    jest.advanceTimersByTime(THROTTLE_TIME);

    const result = await throttledFn;

    expect(result).toEqual(expectedData);
  });

});
