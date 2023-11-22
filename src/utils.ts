import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { config } from './config';
import { RequestOptions } from './types';

/**
 * Makes an HTTP request to a specified URI with optional data.
 *
 * @param options - The request options.
 * @returns A promise that resolves with the server's response.
 * @throws Re-throws Axios error for custom error handling.
 *
 * @example
 * const response = await req({
 *   method: 'GET',
 *   uri: 'example-endpoint',
 *   withCredentials: false,
 * });
 */
export const req = ({
    fullUrl,
    method = 'GET',
    uri = '',
    data,
    signal = new AbortController().signal,
    withCredentials = true,
}: RequestOptions): Promise<AxiosResponse> => {
    const url: string = fullUrl || `${config.baseUrl!}/${uri}`;

    const payload: AxiosRequestConfig = {
        method,
        withCredentials,
        url,
        signal,
        ...['post', 'patch'].includes(method.toLowerCase()) && { data },
    };
    return axios(payload);
};
