import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseAbstractEntity } from './BaseAbstractEntity';
import { IsNotEmpty } from 'class-validator';
import { User } from './User';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class AuthToken extends BaseAbstractEntity {
  @Column({ unique: true })
  jti: string;

  @Column()
  @IsNotEmpty()
  token: string;

  @ManyToOne(() => User, (user) => user.authTokens, { onDelete: 'CASCADE' })
  user: User;

  static async signAndSave(user: User) {
    const jti = uuidv4();
    const token = jwt.sign({ sub: user.id }, process.env.AUTH_TOKEN_SECRET, {
      jwtid: jti,
    });
    const authToken = this.create();
    authToken.jti = jti;
    authToken.token = token;
    authToken.user = user;
    await this.save(authToken);
    return token;
  }

  static findOneByJti(jti: string) {
    return this.findOne({ where: { jti } });
  }

  static async verify(token: string) {
    let verified;
    try {
      verified = jwt.verify(token, process.env.AUTH_TOKEN_SECRET);
    } catch (err) {
      return null;
    }
    if (!verified) {
      return null;
    }
    const { jti } = verified as any;
    const foundAuthToken = await AuthToken.findOneByJti(jti);
    if (!foundAuthToken) {
      return null;
    }
    return verified;
  }

  static async verifyAndFindUser(token: string) {
    const verified = await this.verify(token);
    if (!verified) {
      return null;
    }
    const { sub } = verified as any;
    const viewer = await User.findOne(sub);
    return viewer;
  }

  static async deleteByJti(jti: string) {
    await this.delete({ jti });
  }
}
