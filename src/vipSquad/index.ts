import { config } from "../config";
import { req } from "./utils";

/**
* VipSquad class to interact with the WHOP API for authentication and user information.
*/
export default class VipSquad {
    /**
     * Constructor for the VipSquad class.
     */
    constructor() {

    }

    // /**
    //  * Retrieves an authentication token from the WHOP API using the provided authorization code.
    //  *
    //  * @param {string} code - The authorization code obtained during the OAuth 2.0 authorization process.
    //  * @returns {Promise<object>} - A Promise that resolves to the response data containing the access token.
    //  * @throws {Error} - Throws an error if the authentication fails.
    //  */
    // async getAuthToken(code: string): Promise<AccessTokenResponse> {
    //     try {
    //         const response = await req({
    //             fullUrl: 'https://api.whop.com/api/v2/oauth/token', method: 'POST', data: {
    //                 grant_type: 'authorization_code',
    //                 code,
    //                 client_id: config.WHOP_CLIENT_ID,
    //                 client_secret: config.WHOP_CLIENT_SECRET,
    //                 redirect_uri: config.WHOP_REDIRECT_URL,
    //             }
    //         })
    //         return response.data;
    //     } catch (error) {
    //         console.log(error);
    //         throw error;
    //     }
    // };

    // /**
    //  * Checks whether the provided access token has access to the specified WHOP company.
    //  *
    //  * @param {string} accessToken - The access token obtained during the authentication process.
    //  * @returns {Promise<object>} - A Promise that resolves to the response data indicating access status.
    //  * @throws {Error} - Throws an error if the access check fails.
    //  */
    // async checkAccess(accessToken: string): Promise<object> {
    //     try {
    //         const response = await req({
    //             fullUrl: `https://api.whop.com/api/v2/me/has_access/${config.WHOP_COMPANY_ID}`,
    //             headers: {
    //                 Authorization: `Bearer ${accessToken}`,
    //             }
    //         });
    //         return response.data;
    //     } catch (error) {
    //         console.log(error);
    //         throw error;
    //     }
    // };

    // /**
    //  * Retrieves user information from the WHOP API using the provided access token.
    //  *
    //  * @param {string} accessToken - The access token obtained during the authentication process.
    //  * @returns {Promise<object>} - A Promise that resolves to the response data containing user information.
    //  * @throws {Error} - Throws an error if the user information retrieval fails.
    //  */
    // async getUser(accessToken: string): Promise<object> {
    //     try {
    //         const response = await req({
    //             fullUrl: `https://api.whop.com/api/v2/me`,
    //             headers: {
    //                 Authorization: `Bearer ${accessToken}`,
    //             }
    //         });
    //         return response.data;
    //     } catch (error) {
    //         console.log(error);
    //         throw error;
    //     }
    // };

    /**
     * Retrieves the Greed Index information from the specified base URL.
     *
     * @returns {Promise<object>} - A Promise that resolves to the response data containing the Greed Index information.
     * @throws {Error} - Throws an error if the API request to retrieve the Greed Index fails.
     */
    async getGreedIdx(): Promise<object> {
        try {
            const response = await req({
                fullUrl: config.greedIdxBaseUrl as string
            })
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    /**
     * Retrieves information from the CryptoPanic API based on the provided query parameters.
     *
     * @param {object} query - The optional query parameters to be added to the API request URL.
     * @returns {Promise<object>} - A Promise that resolves to the response data from the CryptoPanic API.
     * @throws {Error} - Throws an error if the API request fails.
     */
    async getCryptoPanic(query: { currencies: string }): Promise<object> {
        try {
            let fullUrl = config.cryptoPanicBaseUrl + `?auth_token=${config.cryptoPanicToken}`;
            if (query.currencies) {
                fullUrl += `&currencies=${query.currencies.toUpperCase()}`;
            }
            const response = await req({
                fullUrl
            });

            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


};
