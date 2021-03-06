import { NextApiHandler } from 'next';
import { sendMessage } from 'services';
import type { Message } from 'types';

export type Errors = {
  errors: {
    [error: string]: {
      reason: string;
      value: unknown;
    };
  };
};

const errors: Errors = { errors: {} };

const handler: NextApiHandler<Message | Errors | string> =
  async function handler(req, res) {
    if (req.method !== 'POST') {
      res.status(405).send('only accept POST method. Received: ' + req.method);
      return;
    }

    const { text, name, email, subject } = req.body;

    if (!text && typeof text !== 'string') {
      errors.errors.message = {
        reason: 'message is required and must be a string',
        value: '' + text,
      };

      console.error(errors);

      res.status(400).json(errors);
      return;
    }

    try {
      const sent = await sendMessage({
        text: text as string,
        name,
        email,
        subject,
      });
      res.status(200).json(sent);
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  };

export default handler;
