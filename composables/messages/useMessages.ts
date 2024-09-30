import { hexToBytes, bytesToHex } from "@noble/hashes/utils";
import { finalizeEvent, nip44 } from "nostr-tools";

import { useStorage } from "@vueuse/core";
const v2 = nip44.v2;

const conversationKey = useStorage("conversationKey", "");

export default () => {
  const { $dexie } = useNuxtApp();

  const decryptMessage = (encrypted: string): string => {
    const decrypted = v2.decrypt(encrypted, hexToBytes(conversationKey.value));
    return decrypted;
  };

  const sendMessage = async (
    senderPrivateKey: string,
    receiverPublicKey: string,
    message: string
  ): Promise<boolean> => {
    const randomKey = v2.utils.getConversationKey(
      hexToBytes(senderPrivateKey),
      receiverPublicKey
    );

    const encrypted = v2.encrypt(message, randomKey);
    const event = {
      kind: 14, // Custom kind for messages, update as necessary
      created_at: Math.floor(Date.now()),
      content: encrypted,
      tags: [["p", receiverPublicKey]], // Tagging receiver's public key
    };
    const eventF = finalizeEvent(event, hexToBytes(senderPrivateKey));
    $dexie.events.add({
      ...eventF,
      status: "Sending",
    });
    conversationKey.value = bytesToHex(randomKey);
    return true;
  };

  return {
    sendMessage,
    decryptMessage,
  };
};
