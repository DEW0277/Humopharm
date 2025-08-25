import customerImage from "@/images/customer.png";
import paperPlaneImage from "@/images/paper-plane.png";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";

import { useForm } from "react-hook-form";
import type z from "zod";
import { formSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";

function Contact() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      userphone: "",
      usermessage: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    form.reset();
  };
  return (
    <section className="section" id="contact">
      <div className="flex flex-col items-center gap-4">
        <img src={customerImage} className="w-12 h-12 md:w-12 md:h-12" alt="" />
        <h2 className="font-bold text-[32px] sm:text-[42px] md:text-[58px] text-[#413838] text-center">
          Biz bilan bog’laing
        </h2>
      </div>

      <div className="max-w-md mx-auto mt-4 text-center">
        <p className="font-medium text-sm sm:text-base text-black">
          Chunki sizning ma’mnunligingiz biz uchun birinchi o’rinda. Biz ham ziga eng yaxshi xizmatlarni taklif qilamiz
        </p>
      </div>

      <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mt-8 bg-[#F9F9F9] p-6 sm:p-8 rounded-lg shadow-lg">
        <div className="w-full md:w-1/2 mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full">
                    <FormLabel>
                      Ismingiz <span className="font-semibold text-[#BD1033]">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Ismingiz" className="focus-visible:ring-0 w-full" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userphone"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full">
                    <FormLabel>
                      Telefon raqamingiz <span className="font-semibold text-[#BD1033]">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Telefon" className="focus-visible:ring-0 w-full" type="tel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="usermessage"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full">
                    <FormLabel>
                      Maqsadingiz <span className="font-semibold text-[#BD1033]">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea placeholder="Batafsil" className="focus-visible:ring-0 w-full" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                variant="ghost"
                className="w-full flex items-center justify-center gap-2 bg-[#BD1033] text-white hover:bg-[#A00C2B] py-4 rounded-lg cursor-pointer"
              >
                <span>Yuborish</span>
                <img className="w-6 h-6" src={paperPlaneImage} alt="" />
              </Button>
            </form>
          </Form>
        </div>

        <div className="w-full md:w-1/2 bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="h-60 sm:h-72 md:h-80 w-full">
            <iframe
              src="https://www.google.com/maps?q=40.786553,72.382894&hl=ru&z=14&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
