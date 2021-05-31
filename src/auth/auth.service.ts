import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import * as admin from 'firebase-admin';
import serviceAccount from '../../auth/niklib-firebase-adminsdk-xf2fy-cdc567ac43.json';
import { ServiceAccount } from 'firebase-admin/lib/credential';

@Injectable()
export class AuthService {
  async verifyUser(token: string): Promise<boolean> {
    if (!admin.apps.length)
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as ServiceAccount),
      });
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

  async checkUser(user: string): Promise<boolean> {
    const users = process.env.ACCEPTED_USERS.split(',');
    return users.includes(user);
  }
}
