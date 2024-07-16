import { bytesToHex, hexToBytes } from "@noble/hashes/utils";
import { useStorage } from "@vueuse/core";
import {
  Event as NostrEvent,
  finalizeEvent,
  generateSecretKey,
  getPublicKey,
} from "nostr-tools";

const loggedIn = useStorage("loggedIn", false);
const certs: any = useStorage("current-certs", {
  pub: "",
  priv: "",
});
const profile: any = useStorage("current-user", {
  firstName: "",
  lastName: "",
  displayName: "",
  name: "",
  about: "",
  email: "",
  avatar: null,
  pub: "",
  priv: "",
});

export default () => {
  const userPub = useCookie("userPub", {
    default: () => "",
    watch: true,
  });
  const registerNew = async () => {
    if (!loggedIn.value) {
      const priv = generateSecretKey(); // `sk` is a hex string
      const pub = getPublicKey(priv); // `pk` is a hex string
      const randomName = GenerateIdentity(pub, "fa");

      profile.value = {
        firstName: randomName.split(" ")[0],
        lastName: randomName.split(" ")[1],
        displayName: randomName,
        userName: "",
        about: `تازه${randomName}یک `,
        email: "",
        avatar: "",
        pub,
      };
      certs.value = {
        pub,
        priv: bytesToHex(priv),
      };

      userPub.value = pub;
      await registerToServer();
      // loggedIn.value = true;
    }
  };
  const registerToServer = async () => {
    const event: NostrEvent = finalizeEvent(
      {
        kind: 0,
        created_at: Math.floor(Date.now() / 1000),
        tags: [],
        content: JSON.stringify(profile.value),
      },
      hexToBytes(certs.value.priv),
    );
    const body: any = await $fetch("/api/members/register", {
      method: "post",
      body: event,
    });
    console.log(body);
  };

  return {
    certs,
    profile,
    registerNew,
  };
};
