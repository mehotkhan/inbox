import { hexToBytes } from "@noble/hashes/utils";
import type { Event as NostrEvent } from "nostr-tools";
import { finalizeEvent, nip44, validateEvent } from "nostr-tools";
import { ref } from "vue";

const v2 = nip44.v2;

export default () => {
  const encryptedMessage = ref<string | null>(null);
  const decryptedMessage = ref<string | null>(null);

  const decryptMessage = async (
    privateKey: string,
    senderPublicKey: string,
    encrypted: string
  ): Promise<string> => {
    const conversationKey = v2.utils.getConversationKey(
      hexToBytes(privateKey),
      senderPublicKey
    );
    const decrypted = v2.decrypt(encrypted, conversationKey);
    return decrypted;
  };

  const sendMessage = async (
    senderPrivateKey: string,
    receiverPublicKey: string,
    message: string
  ): Promise<boolean> => {
    const conversationKey = v2.utils.getConversationKey(
      hexToBytes(senderPrivateKey),
      receiverPublicKey
    );
    const encrypted = v2.encrypt(message, conversationKey);
    const event = {
      kind: 14, // Custom kind for messages, update as necessary
      created_at: Math.floor(Date.now()),
      content: encrypted,
      tags: [["p", receiverPublicKey]], // Tagging receiver's public key
    };
    const eventF = finalizeEvent(event, hexToBytes(senderPrivateKey));
    console.log(eventF);
    return true;
  };

  const readMessage = async (
    eventBody: NostrEvent,
    receiverPrivateKey: string
  ): Promise<string> => {
    if (!validateEvent(eventBody)) {
      throw new Error("Invalid event format");
    }
    const senderPublicKey = eventBody.tags.find((tag) => tag[0] === "p")?.[1];
    if (!senderPublicKey) {
      throw new Error("Sender public key not found in tags");
    }
    return decryptMessage(
      receiverPrivateKey,
      senderPublicKey,
      eventBody.content
    );
  };

  return {
    encryptedMessage,
    decryptedMessage,
    sendMessage,
    readMessage,
  };
};
