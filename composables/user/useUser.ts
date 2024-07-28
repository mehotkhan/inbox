import { bytesToHex, hexToBytes } from "@noble/hashes/utils";
import type { Event as NostrEvent } from "nostr-tools";
import { finalizeEvent, generateSecretKey, getPublicKey } from "nostr-tools";

export default () => {
  const loggedIn = useCookie("loggedIn", {
    default: () => false,
    maxAge: cookieExpire,
  });
  const certs = useCookie("current-certs", {
    default: () => {
      return { pub: "", priv: "" };
    },
    maxAge: cookieExpire,
  });
  const profile = useCookie("current-user", {
    default: () => {
      return {
        firstName: "",
        lastName: "",
        displayName: "",
        userName: "",
        about: "",
        email: "",
        avatar: "",
        pub: "",
      };
    },
    maxAge: cookieExpire,
  });
  const userPub = useCookie("userPub", {
    default: () => "",
    maxAge: cookieExpire,
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
        about: `یک ${randomName} تازه وارد :)`,
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
      loggedIn.value = true;
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
      hexToBytes(certs.value.priv)
    );
    await $fetch("/api/members/register", {
      method: "post",
      body: event,
    });
    // console.log(body);
  };

  return {
    loggedIn,
    certs,
    profile,
    registerNew,
  };
};
