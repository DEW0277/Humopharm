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
import { useState } from "react";
import { useTranslation } from "react-i18next";

const sendToTelegram = async (formData: { username: string; userphone: string; usermessage?: string }) => {
  const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '8447023273:AAHg9GbTso7_zH7OR2wEFt3AE0HosT3OW6k';
  const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID || '-1003036020964';

  const message = `
🔔 *${formData.username}*  
📞 *${formData.userphone}*  
💬 *${formData.usermessage || "—"}*  
📅 *${new Date().toLocaleDateString()}*  
⏰ *${new Date().toLocaleTimeString()}*
`;

  const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message,
      parse_mode: "Markdown",
    }),
  });

  if (!response.ok) throw new Error("Telegram API error");

  return await response.json();
};

function Contact() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      userphone: "",
      usermessage: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setMessage("");

    try {
      await sendToTelegram(values);
      setMessage(t("contact.success"));
      form.reset();
      setTimeout(() => setMessage(""), 5000);
    } catch {
      setMessage(t("contact.error"));
      setTimeout(() => setMessage(""), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="section" id="contact">
      <div className="flex flex-col items-center gap-4">
        <img src={customerImage} className="w-12 h-12 md:w-12 md:h-12" alt={t("contact.iconAlt")} />
        <h2 className="font-bold text-[32px] sm:text-[42px] md:text-[58px] text-[#413838] text-center">
          {t("contact.title")}
        </h2>
      </div>

      <div className="max-w-md mx-auto mt-4 text-center">
        <p className="font-medium text-sm sm:text-base text-black">{t("contact.subtitle")}</p>
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
                      {t("contact.name")} <span className="font-semibold text-[#BD1033]">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("contact.namePlaceholder")}
                        className="focus-visible:ring-0 w-full"
                        disabled={isLoading}
                        {...field}
                      />
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
                      {t("contact.phone")} <span className="font-semibold text-[#BD1033]">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("contact.phonePlaceholder")}
                        className="focus-visible:ring-0 w-full"
                        type="tel"
                        disabled={isLoading}
                        {...field}
                      />
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
                      {t("contact.message")} <span className="font-semibold text-[#BD1033]">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t("contact.messagePlaceholder")}
                        className="focus-visible:ring-0 w-full"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                variant="ghost"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 bg-[#BD1033] text-white hover:bg-[#A00C2B] py-4 rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>{t("contact.sending")}</span>
                  </>
                ) : (
                  <>
                    <span>{t("contact.submit")}</span>
                    <img className="w-6 h-6" src={paperPlaneImage} alt={t("contact.planeAlt")} />
                  </>
                )}
              </Button>

              {message && (
                <div
                  className={`mt-4 p-3 rounded-lg text-center text-sm font-medium ${
                    message.includes("✅")
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {message}
                </div>
              )}
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
