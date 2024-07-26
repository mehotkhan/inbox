import { ref } from "vue";
import { schnorr } from "@noble/curves/secp256k1";
import { finalizeEvent, validateEvent, nip44 } from "nostr-tools";
import { bytesToHex, hexToBytes } from "@noble/hashes/utils";
import type { Event as NostrEvent } from "nostr-tools";

const v2 = nip44.v2;

const str2ab = (str: string): Uint8Array => {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0; i < str.length; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return bufView;
};

const ab2str = (buf: Uint8Array): string => {
  return String.fromCharCode(...buf);
};

export const useNostrMessaging = () => {
  const privateKey = ref<string>(bytesToHex(schnorr.utils.randomPrivateKey()));
  const publicKey = ref<string>(
    bytesToHex(schnorr.getPublicKey(hexToBytes(privateKey.value)))
  );

  const encryptedMessage = ref<string | null>(null);
  const decryptedMessage = ref<string | null>(null);

  const getConversationKey = (
    privateKey: string,
    receiverPublicKey: string
  ): Uint8Array => {
    return v2.utils.getConversationKey(
      hexToBytes(privateKey),
      hexToBytes(receiverPublicKey)
    );
  };

  const encryptMessage = async (
    message: string,
    receiverPublicKey: string
  ): Promise<string> => {
    const conversationKey = getConversationKey(
      privateKey.value,
      receiverPublicKey
    );
    const encrypted = v2.encrypt(str2ab(message), conversationKey);
    encryptedMessage.value = bytesToHex(encrypted);
    return encryptedMessage.value;
  };

  const decryptMessage = async (
    encrypted: string,
    senderPublicKey: string
  ): Promise<string> => {
    const conversationKey = getConversationKey(
      privateKey.value,
      senderPublicKey
    );
    const decrypted = v2.decrypt(hexToBytes(encrypted), conversationKey);
    decryptedMessage.value = ab2str(decrypted);
    return decryptedMessage.value;
  };

  const sendMessage = async (
    senderPrivateKey: string,
    receiverPublicKey: string,
    message: string
  ): Promise<NostrEvent> => {
    const encryptedContent = await encryptMessage(message, receiverPublicKey);
    const event = {
      kind: 42, // Custom kind for messages, update as necessary
      created_at: Math.floor(Date.now() / 1000),
      content: encryptedContent,
      tags: [["p", receiverPublicKey]], // Tagging receiver's public key
    };
    return finalizeEvent(event, hexToBytes(senderPrivateKey));
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
    return decryptMessage(eventBody.content, senderPublicKey);
  };

  return {
    privateKey,
    publicKey,
    encryptedMessage,
    decryptedMessage,
    sendMessage,
    readMessage,
  };
};
