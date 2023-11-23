import express from 'express';
import { callback, logout, me } from "./entity";
/**
 * Express Router for handling authentication and user-related routes.
 * @type {express.Router}
 */
const router: express.Router = express.Router();

/**
 * Route for handling the callback from the authentication provider.
 *
 * @param {express.Request} req - Express Request object
 * @param {express.Response} res - Express Response object
 * @redirects to the frontend url
 */
router.get('/callback', callback);

/**
 * Route for retrieving user information based on the authentication token.
 *
 * @param {express.Request} req - Express Request object
 * @param {express.Response} res - Express Response object
 * @returns {object} the user information
 */
router.get('/me', me);

/**
 * Route for handling user logout by clearing the authentication cookie.
 *
 * @param {express.Request} req - Express Request object
 * @param {express.Response} res - Express Response object
 * @returns {void}
 */
router.post('/logout', logout);

export default router;
