import z from "zod";

export const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  userphone: z.string().min(2, {
    message: "Phone number must be at least 2 characters.",
  }),
  usermessage: z.string().optional(),
});
