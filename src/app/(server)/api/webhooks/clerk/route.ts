import { createUser } from "@/db/users";
import { headers } from 'next/headers';
import { Webhook } from 'svix';
import { ClerkWebhookEvent } from './types/event';
import { ClerkWebhookUserCreateEvent } from './types/user-create-event';

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET as string;

async function validateRequest(request: Request) {
  const payloadString = await request.text()
  const headerPayload = await headers()

  const svixHeaders = {
    'svix-id': headerPayload.get('svix-id')!,
    'svix-timestamp': headerPayload.get('svix-timestamp')!,
    'svix-signature': headerPayload.get('svix-signature')!,
  }
  const wh = new Webhook(webhookSecret)
  return wh.verify(payloadString, svixHeaders) as ClerkWebhookEvent
}

export async function POST(req: Request) {
  let evt: ClerkWebhookEvent;
  try {
    evt = await validateRequest(req);
  } catch (err) {
    console.log('Invalid signature or error validating request:', err);
    return new Response('Invalid signature', { status: 400 });
  }

  const eventType = evt.type;

  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name } = (evt as ClerkWebhookUserCreateEvent).data;
    console.log('creating a user');
    
    try {
      await createUser({ id, email: email_addresses[0].email_address, name: `${first_name} ${last_name}` });
    }
    catch (err) {
      console.log(err);
    }
  }

  return new Response('OK', { status: 200 });
}