import { BaseAbstractEntity } from './BaseAbstractEntity';
import { Entity, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import { IsEmail } from 'class-validator';
import jwt from 'jsonwebtoken';
import nanoid from 'nanoid';

interface AccessTokenPayloadUser {
  id: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  googleProfileId: string;
}

interface AccessTokenPayload {
  jti: string;
  sub: string;
  user: AccessTokenPayloadUser;
}

interface AccessTokenDecodedPayload extends AccessTokenPayload {
  iat: number;
  exp: number;
}

@Entity()
export class User extends BaseAbstractEntity {
  @Column({ unique: true })
  googleProfileId: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  @IsEmail()
  email: string;

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    this.validateAndThrowIfHasErrors();
  }

  static findByGoogleProfileId(googleProfileId: string) {
    return this.findOne({ where: { googleProfileId } });
  }

  generateAccessToken() {
    const { id, email, firstName, lastName, googleProfileId } = this;
    const payload: AccessTokenPayload = {
      jti: nanoid(),
      sub: id,
      user: {
        id,
        email,
        firstName,
        lastName,
        googleProfileId,
      },
    };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1h',
    });
    const decoded = jwt.decode(accessToken) as AccessTokenDecodedPayload;
    const { exp: expiresAt } = decoded;
    return { accessToken, expiresAt };
  }
}
