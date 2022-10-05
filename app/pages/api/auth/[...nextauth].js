import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { verifyPassword } from '../../../lib/authorization';
import clientPromise from '../../../lib/mongodb-api';

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        
        await clientPromise;
        const client = await clientPromise;
        await client.connect();    
        const usersCollection = client.db().collection('users');

        const user = await usersCollection.findOne({
          username: credentials.username,
        });

        if (!user) {
          client.close();
          throw new Error('invalid');
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error('invalid');
        }
        client.close();
        return { username: user.username };
      },
    }),
  ],
});
