import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import * as admin from 'firebase-admin';
import serviceAccount from '../../auth/niklib-firebase-adminsdk-xf2fy-64147639b1.json';
import { ServiceAccount } from 'firebase-admin/lib/credential';

if (!admin.apps.length)
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
  });

@Injectable()
export class AuthService {
  async verifyUser(token: string): Promise<boolean> {
    if (token) {
      await admin
        .auth()
        .verifyIdToken(token)
        .catch(() => {
          throw new NotAcceptableException();
        });
    } else {
      throw new UnauthorizedException();
    }

    return true;
  }

  async invalidateUser(token: string): Promise<boolean> {
    let uid = '';
    if (token) {
      await admin
        .auth()
        .verifyIdToken(token)
        .then((decodedToken) => {
          uid = decodedToken.uid;
        })
        .catch(() => {
          throw new NotAcceptableException();
        });
    } else {
      throw new UnauthorizedException();
    }
    await admin.auth().revokeRefreshTokens(uid);

    return true;
  }

  async checkUser(user: string): Promise<boolean> {
    const users = process.env.ACCEPTED_USERS.split(',');
    return users.includes(user);
  }
}
