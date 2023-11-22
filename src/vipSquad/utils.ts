import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { config } from '../config';
import { AccessTokenResponse, RequestOptions } from './types';

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
    ...rest
}: RequestOptions): Promise<AxiosResponse> => {
    const url: string = fullUrl || `${config.baseUrl!}/${uri}`;

    const payload: AxiosRequestConfig = {
        method,
        withCredentials,
        url,
        signal,
        ...['post', 'patch'].includes(method.toLowerCase()) && { data },
        ...rest
    };
    return axios(payload);
};

/**
 * Retrieves an authentication token from the WHOP API using the provided authorization code.
 *
 * @param {string} code - The authorization code obtained during the OAuth 2.0 authorization process.
 * @returns {Promise<object>} - A Promise that resolves to the response data containing the access token.
 * @throws {Error} - Throws an error if the authentication fails.
 */
export async function getAuthToken(code: string): Promise<AccessTokenResponse> {
    try {
        const response = await req({
            fullUrl: 'https://api.whop.com/api/v2/oauth/token', method: 'POST', data: {
                grant_type: 'authorization_code',
                code,
                client_id: config.WHOP_CLIENT_ID,
                client_secret: config.WHOP_CLIENT_SECRET,
                redirect_uri: config.WHOP_REDIRECT_URL,
            }
        })
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


/**
 * Retrieves user information from the WHOP API using the provided access token.
 *
 * @param {string} accessToken - The access token obtained during the authentication process.
 * @returns {Promise<object>} - A Promise that resolves to the response data containing user information.
 * @throws {Error} - Throws an error if the user information retrieval fails.
 */
export async function getUser(accessToken: string): Promise<object> {
    try {
        const response = await req({
            fullUrl: `https://api.whop.com/api/v2/me`,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

/**
* Checks whether the provided access token has access to the specified WHOP company.
*
* @param {string} accessToken - The access token obtained during the authentication process.
* @returns {Promise<object>} - A Promise that resolves to the response data indicating access status.
* @throws {Error} - Throws an error if the access check fails.
*/
export async function checkAccess(accessToken: string): Promise<object> {
    try {
        const response = await req({
            fullUrl: `https://api.whop.com/api/v2/me/has_access/${config.WHOP_COMPANY_ID}`,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};