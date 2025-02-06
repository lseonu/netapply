import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { db } from '../db';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuth = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      throw new Error('Invalid token');
    }

    // Check if user exists, if not create new user
    let user = await db.query(
      'SELECT * FROM users WHERE google_id = $1',
      [payload.sub]
    );

    if (!user.rows.length) {
      user = await db.query(
        'INSERT INTO users (email, name, google_id) VALUES ($1, $2, $3) RETURNING *',
        [payload.email, payload.name, payload.sub]
      );
    }

    // Generate JWT
    const jwtToken = jwt.sign(
      { userId: user.rows[0].id },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    res.json({ token: jwtToken, user: user.rows[0] });
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
}; 