import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const axiosClient = {
      get: jest.fn().mockResolvedValue({ data: 'testData' }),
    };
    (axios.create as jest.Mock).mockReturnValue(axiosClient);

    await throttledGetDataFromApi('/posts');

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com'
    });
  });

  test('should perform request to correct provided url', async () => {
  
    await throttledGetDataFromApi('/posts');

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com'
    });
  
    const axiosClient = (axios.create as jest.Mock).mock.results[0]?.value;
  
    expect(axiosClient?.get).toHaveBeenCalledWith('/posts');
  });

  test('should return response data', async () => {
    const expectedData = 'testData';
    const axiosClient = {
      get: jest.fn().mockResolvedValue({data: 'testData'}),
    };

    (axios.create as jest.Mock).mockReturnValue(axiosClient);

    const result = await throttledGetDataFromApi('/posts');

    expect(result).toEqual(expectedData);
  });
});
