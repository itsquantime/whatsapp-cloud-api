import NodeCache from 'node-cache';
import { Conversation, Message } from '../interface/wsConversationInterface';

const Cache = new NodeCache({ stdTTL: 60 * 60, checkperiod: 60 * 60 });

export const getConversation = (contact: string): Conversation => Cache.get(contact) as Conversation;

export const updateConversation = (contact: string, message: Message) => {
    console.log("🚀 ~ file: wsConversation.ts ~ line 77 ~ updateConversation ~ contact", contact)
    console.log("🚀 ~ file: wsConversation.ts ~ line 77 ~ updateConversation ~ message", message)
}