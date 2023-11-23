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
    async getCryptoPanic({ currencies, page = 1 }: { currencies?: string, page?: number }): Promise<object> {
        try {
            let fullUrl = config.cryptoPanicBaseUrl + `/?auth_token=${config.cryptoPanicToken}&page=${page}`;
            if (currencies) {
                fullUrl += `&currencies=${currencies.toUpperCase()}`;
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
