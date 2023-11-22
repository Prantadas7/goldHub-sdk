import { Request, Response } from 'express';
import { config } from "../config";
import { checkAccess, getAuthToken, getUser } from '../vipSquad/utils';

export const callback = async (req: Request, res: Response) => {
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

export const me = async (req: Request, res: Response) => {
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

export const logout = () => async (req: Request, res: Response) => {
  try {
    res.clearCookie(req.cookies[config.secret as string]);
    res.status(200).send({ message: 'loggedout successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Internal Server Error' });
  }
}


// export const greedIDX = ({ vipSquad }: { vipSquad: VipSquad }) => async (req: Request, res: Response) => {
//   try {
//     const response = vipSquad.getGreedIdx();
//     res.status(200).send(response);
//   }
//   catch (err) {
//     console.log(err);
//   }
// }