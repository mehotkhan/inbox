import { useStorage } from "@vueuse/core";
import { WebUUID } from "web-uuid";

const modalMode = useStorage("support-help-desk-mode", "chat");
const contactLists = useStorage("support-contact-lists", [{}]);
const qaLists = useStorage("support-qa-lists", [{}]);
const defaultContact: any = useStorage("support-default-contact", {});
const currentTicket: any = useStorage("support-current-ticket", {});
const expanded = useStorage("support-helpDesk-expanded", false);
const firstVisit = useStorage("support-first-visit", true);

const messageLimit = ref(200);
const archiveLimit = ref(20);
const modalBoxIsOpen = ref(true);

const sectionTitle = (mode: string) => {
  const map = [
    {
      mode: "home",
      title: "خانه",
    },
    {
      mode: "chats",
      title: "پیام ها",
    },
    {
      mode: "call",
      title: "تماس",
    },
  ];
  return map.find((item: any) => item.mode === mode)?.title;
};
export default () => {
  const { certs } = useUser();
  const { sendMessage } = useMessages();

  const welcomeMessage = async () => {
    // if (firstVisit.value) {
    //   setTimeout(() => {
    //     modalBoxIsOpen.value = true;
    //     firstVisit.value = false;
    //   }, 7000);
    // }
    // first visit time !!!
    /*
      basic flow of supporting systems
      */
    // 1- if first visit time ?
    // 2- get page route
    // 2-1 : there is some other strategy for other page ?
    // 3- create welcome message
    // 4- get moderator list form KV
    // 5- find a way to select random manager
    // 6- create first message and send response to receiver
    // 7- message must have some ta for filtering in moderator ui
    // 8- message must have some filter and metadata to better managing like : open ,close and ...
    // if (firstVisit.value && profile.value.pub !== testReceiver) {
    //   const startTimer = 10000 // 10 seconds
    //   // get from KV
    //   const newTicket = {
    //     message: `پیام جدید از سمت ${profile.value.displayName}`,
    //     receiver: testReceiver,
    //     subjects: 'welcome',
    //   }
    //   setTimeout(async () => {
    //     await createNew(newTicket)
    //   }, startTimer)
    //   firstVisit.value = false
    // }
  };

  const getContactLists = async () => {
    // try {
    //   const api: any = await $fetch(baseApiURL() + "support/contact-lists", {
    //     method: "GET",
    //   });
    //   const response: any[] = await JSON.parse(api);
    //   contactLists.value = response?.filter((item: any) => !item.default);
    //   defaultContact.value = response?.find((item: any) => item.default);
    // } catch (error) {
    //   // contactLists.value = []
    // }
  };

  const createNewDefault = async () => {
    const id = String(new WebUUID());
    const newTicket = {
      id,
      topic: "support",
      status: "new",
      owner: certs.value.pub,
      operator: "adminPub",
    };
    currentTicket.value = newTicket;
    changeView("chat");
  };

  const createNew = async (contact: any) => {
    const id = String(new WebUUID());
    const newTicket = {
      id,
      topic: contact.name,
      status: "new",
      owner: certs.value.pub,
      operator: contact.pub,
    };
    currentTicket.value = newTicket;
    changeView("chat");
  };

  const openSupportTicket = async (ticket: any) => {
    currentTicket.value = ticket;
    changeView("chat");
  };

  const sendTicket = async (message: string) => {
    if (!message.length) return;
    await sendMessage(certs.value.priv, certs.value.pub, message);
  };

  const changeView = (mode: "home" | "chats" | "call" | "chat") => {
    modalMode.value = mode;
  };

  const viewTitle = computed(() => sectionTitle(modalMode.value));

  const supportTimeLine: any = [];

  const supportArchive: any = [];

  const expandView = () => {
    expanded.value = !expanded.value;
  };
  const getQaLists = async () => {
    // try {
    //   const api: any = await $fetch(baseApiURL() + "manage/qa-lists", {
    //     method: "GET",
    //   });
    //   const response: string[] = await JSON.parse(api);
    //   qaLists.value = response;
    // } catch (error) {
    //   console.log(error);
    // }
  };
  return {
    welcomeMessage,
    changeView,
    modalMode,
    modalBoxIsOpen,
    viewTitle,
    openSupportTicket,
    getContactLists,
    contactLists,
    defaultContact,
    createNewDefault,
    sendTicket,
    supportTimeLine,
    supportArchive,
    createNew,
    expanded,
    expandView,
    currentTicket,
    getQaLists,
    qaLists,
  };
};
