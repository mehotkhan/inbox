import type { FormSubmitEvent } from "#ui/types";
import { object, string, type InferType } from "yup";
const submitting = ref(false);
const newBlogSchema = object({
  title: string().min(3, "Must be at least 8 characters").required("Required"),
  summery: string()
    .min(3, "Must be at least 8 characters")
    .required("Required"),
  body: string().min(3, "Must be at least 8 characters").required("Required"),
});

type newBlogSchema = InferType<typeof newBlogSchema>;

const newBlogState = reactive({
  title: "ssssssss",
  summery: "ssssssss",
  body: "ssssssss",
});

export default () => {
  const toast = useToast();

  const createNewBlog = async (event: FormSubmitEvent<newBlogSchema>) => {
    submitting.value = true;
    try {
      await useApi("/api/blog/new-blog", {
        method: "post",
        body: {
          title: event.data.title,
          summery: event.data.summery,
          body: event.data.body,
        },
      });
      toast.add({
        title: event.data.title,
        description: "Published",
      });
      submitting.value = false;
    } catch (error: any) {
      toast.add({
        color: "red",
        title: event.data.title,
        description: error.statusMessage,
      });
      submitting.value = false;
    }
  };

  return {
    createNewBlog,
    newBlogSchema,
    newBlogState,
    submitting,
  };
};
