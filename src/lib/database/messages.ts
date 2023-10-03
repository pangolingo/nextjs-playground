import sql from '.';

export interface SavedMessage {
  id: string;
  user_id: string | null;
  name: string;
  email: string;
  message: string;
  starters: string[];
}

export async function saveMessage({
  userId,
  name,
  email,
  message,
  starters
}: {
  userId: string | null;
  name: string;
  email: string;
  message: string;
  starters: string[];
}): Promise<SavedMessage> {
  const savedMessage = await sql<SavedMessage[]>`
      insert into messages
        (user_id, name, email, message, starters)
      values
        (${userId}, ${name}, ${email}, ${message}, ${starters})
      returning id, user_id, name, email, message, starters
    `;
  if (savedMessage.length != 1) {
    throw new Error(`Unexpected number of saved messages inserted: ${savedMessage.length}`);
  }
  return savedMessage[0];
}
