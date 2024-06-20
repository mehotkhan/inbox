import type { FormSubmitEvent } from "#ui/types";
import { WebUUID } from "web-uuid";
import { object, string, type InferType } from "yup";
const submitting = ref(false);
const task = ref(0);
const tableLimit = ref(20);
const newSchema = object({
  title: string().min(8, "Must be at least 8 characters").required("Required"),
  story: string().min(8, "Must be at least 8 characters").required("Required"),
});

const imagineSchema = object({
  story: string().min(8, "Must be at least 8 characters").required("Required"),
});

type NewSchema = InferType<typeof newSchema>;
type ImagineSchema = InferType<typeof imagineSchema>;

const state = reactive({
  title: "its just simple story",
  story:
    "Write a short story about a llama that goes on a journey to find an orange cloud",
  promps: [
    {
      promp: "You are a friendly assistant that helps write stories",
    },
  ],
  machineStory: "",
  machineImagine: "",
});

export default () => {
  const toast = useToast();
  const { profile } = useUser();

  const createNew = async (event: FormSubmitEvent<NewSchema>) => {
    submitting.value = true;
    const body: any = await useApi("/api/ai/listening", {
      method: "post",
      body: {
        title: event.data.title,
        story: event.data.story,
        promps: state.promps,
      },
    });
    console.log(body);
    toast.add({
      title: body.title,
      description: "come from machine",
    });
    state.machineStory = body.response;

    // store to dexie
    const newStory = {
      id: WebUUID.v4().toString(),
      title: state.title,
      story: state.machineStory,
      // prompts: state.promps,
      created_at: Math.floor(Date.now() / 1000),
      author: profile.value.pub,
      status: "new",
    };
    // console.log(newStory)
    DexieDB.story.add(newStory);
    submitting.value = false;
    task.value += 1;
  };

  const Imagination = async (event: FormSubmitEvent<ImagineSchema>) => {
    submitting.value = true;
    const imagineText = "crazy old cat";
    const body: any = await useApi("/api/ai/imagine", {
      method: "post",
      body: { imagineText },
    });
    toast.add({
      title: body.title,
      description: "come from machine",
    });
    state.machineImagine = body.response;
    submitting.value = false;
    task.value += 1;
  };
  const addPromps = () => {
    state.promps.push({
      promp: "",
    });
  };
  const PublishStory = async (story: any) => {
    submitting.value = true;
    console.log(story);
    const body: any = await useApi("/api/story/publish", {
      method: "post",
      body: { story },
    });
    console.log(body);
    toast.add({
      title: "story title",
      description: "Story published to cloud",
    });
    // state.machineStory = body.response

    // // store to dexie
    // const newStory = {
    //   id: WebUUID.v4().toString(),
    //   title: state.title,
    //   story: state.machineStory,
    //   // prompts: state.promps,
    //   created_at: Math.floor(Date.now() / 1000),
    //   author: profile.value.pub,
    //   status: "new"
    // }
    // // console.log(newStory)
    // DexieDB.story.add(newStory)
    submitting.value = false;
    task.value += 1;
  };
  const deletePromps = (counter: number) => {
    state.promps.splice(counter, 1);
  };
  const backScene = () => {
    task.value -= 1;
  };
  const myStory: any = useLiveQuery(
    async () => await DexieDB.story.orderBy("created_at").toArray(),
    [tableLimit],
  );

  return {
    createNew,
    task,
    state,
    newSchema,
    addPromps,
    deletePromps,
    submitting,
    Imagination,
    imagineSchema,
    backScene,
    myStory,
    PublishStory,
  };
};
