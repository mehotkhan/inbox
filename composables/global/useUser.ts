import { bytesToHex } from "@noble/hashes/utils";
import { useStorage } from "@vueuse/core";
import { generateSecretKey, getPublicKey } from "nostr-tools";

const loggedIn = useStorage("loggedIn", false);

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
  const registerNew = async () => {
    if (!loggedIn.value) {
      const priv = generateSecretKey(); // `sk` is a hex string
      const pub = getPublicKey(priv); // `pk` is a hex string
      const randomName = SeedNames(pub);
      const guestProfile = "guest";

      const newProfile = {
        firstName: randomName.split(" ")[0],
        lastName: randomName.split(" ")[1],
        displayName: randomName,
        name: guestProfile,
        about: `an newcomer ${randomName}`,
        email: "guest@guest.guest",
        avatar: "",
      };
      const user = {
        pub,
        priv: bytesToHex(priv),
      };
      profile.value = {
        ...newProfile,
        ...user,
      };
      loggedIn.value = true;
      // edgeStorage({
      //   ...newProfile,
      //   pub,
      // });
    }
    console.log("profile", profile.value);
  };

  // const edgeStorage = async (member: any) => {
  //   const body: any = await useApi("/api/members/register", {
  //     method: "post",
  //     body: { ...member },
  //   });
  //   console.log(body);
  // };

  return {
    profile,
    registerNew,
  };
};
