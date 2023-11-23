import { Request, Response } from 'express';
import { config } from "../config";
import { checkAccess, getAuthToken, getUser } from '../vipSquad/utils';


/**
 * Handles the callback route for authentication.
 *
 * @param req - Express Request object
 * @param res - Express Response object
 * @returns {Promise<void>} - Promise representing the asynchronous operation
 */
export const callback = async (req: Request, res: Response): Promise<object | undefined> => {
  try {
    const code: string | undefined = req.query.code as string;
    if (!code) {
      return res.status(400).send({ message: 'Bad Request' });
    }
    const data = await getAuthToken(code)
    if (!data.access_token) return res.status(401).send({ message: 'Unauthorized' })
    res.cookie(config.secret as string, data.access_token, {
      expires: new Date(Date.now() + data.expires_in)
    });
    res.redirect(config.domain as string);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Internal Server Error' });
  }
}

/**
 * Retrieves user information based on the provided authentication token.
 *
 * @param req - Express Request object
 * @param res - Express Response object
 * @returns {Promise<void>} - Promise representing the asynchronous operation
 */
export const me = async (req: Request, res: Response): Promise<object | undefined> => {
  try {
    const authToken = req.cookies[config.secret as string];
    const hasAccess = checkAccess(authToken);
    if (!hasAccess) return res.status(401).send({ message: 'Access Denied' });
    const user = await getUser(authToken);
    user ? res.status(200).send(user) : res.status(404).send({ message: 'User not found' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Internal Server Error' });
  }
}

/**
 * Handles the logout route by clearing the authentication cookie.
 *
 * @param req - Express Request object
 * @param res - Express Response object
 * @returns {Promise<void>} - Promise representing the asynchronous operation
 */
export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie(req.cookies[config.secret as string]);
    res.status(200).send({ message: 'loggedout successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Internal Server Error' });
  }
}