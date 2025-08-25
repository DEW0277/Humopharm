// 1. Telegram Bot API funksiyasi
const sendToTelegram = async (formData: {
  username: string;
  userphone: string;
  usermessage?: string; // ? belgisi qo'shildi - ixtiyoriy maydon
}) => {
  const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN; // Bot tokeningiz
  const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID; // Guruh chat ID

  const message = `
🔔 *Yangi bog'lanish so'rovi*

👤 *Ismi:* ${formData.username}
📞 *Telefon:* ${formData.userphone}
💬 *Xabar:* ${formData.usermessage || 'Xabar kiritilmagan'}

📅 *Sana:* ${new Date().toLocaleDateString('uz-UZ')}
⏰ *Vaqt:* ${new Date().toLocaleTimeString('uz-UZ')}
  `;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: 'Markdown',
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Telegram API xatosi');
    }

    return await response.json();
  } catch (error) {
    console.error('Telegram ga yuborishda xato:', error);
    throw error;
  }
};

// 2. Yangilangan Contact komponenti
import customerImage from '@/images/customer.png';
import paperPlaneImage from '@/images/paper-plane.png';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Button } from '../ui/button';
// import { useToast } from "../ui/use-toast"; // Toast uchun - o'chirildi

import { useForm } from 'react-hook-form';
import type z from 'zod';
import { formSchema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  // const { toast } = useToast(); - o'chirildi

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      userphone: '',
      usermessage: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setMessage(''); // Oldingi xabarni tozalash

    try {
      await sendToTelegram(values);

      // Muvaffaqiyatli yuborilgan xabar (console)
      console.log(
        "✅ Muvaffaqiyat! Xabaringiz yuborildi. Tez orada siz bilan bog'lanamiz."
      );

      // Form ostida muvaffaqiyat xabari
      setMessage(
        "✅ Muvaffaqiyat! Xabaringiz yuborildi. Tez orada siz bilan bog'lanamiz."
      );

      form.reset();

      // 5 soniyadan keyin xabarni yashirish
      setTimeout(() => {
        setMessage('');
      }, 5000);
    } catch (error) {
      // Xato xabari (console)
      console.error(
        '❌ Xatolik! Xabaringizni yuborishda xatolik yuz berdi:',
        error
      );

      // Form ostida xato xabari
      setMessage(
        "❌ Xatolik! Xabaringizni yuborishda xatolik yuz berdi. Qaytadan urinib ko'ring."
      );

      // 5 soniyadan keyin xabarni yashirish
      setTimeout(() => {
        setMessage('');
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className='section' id='contact'>
      <div className='flex flex-col items-center gap-4'>
        <img src={customerImage} className='w-12 h-12 md:w-12 md:h-12' alt='' />
        <h2 className='font-bold text-[32px] sm:text-[42px] md:text-[58px] text-[#413838] text-center'>
          Biz bilan bog'laing
        </h2>
      </div>

      <div className='max-w-md mx-auto mt-4 text-center'>
        <p className='font-medium text-sm sm:text-base text-black'>
          Chunki sizning ma'mnunligingiz biz uchun birinchi o'rinda. Biz ham
          ziga eng yaxshi xizmatlarni taklif qilamiz
        </p>
      </div>

      <div className='w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mt-8 bg-[#F9F9F9] p-6 sm:p-8 rounded-lg shadow-lg'>
        <div className='w-full md:w-1/2 mx-auto'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 sm:space-y-6'
            >
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem className='flex flex-col w-full'>
                    <FormLabel>
                      Ismingiz{' '}
                      <span className='font-semibold text-[#BD1033]'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Ismingiz'
                        className='focus-visible:ring-0 w-full'
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
                name='userphone'
                render={({ field }) => (
                  <FormItem className='flex flex-col w-full'>
                    <FormLabel>
                      Telefon raqamingiz{' '}
                      <span className='font-semibold text-[#BD1033]'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Telefon'
                        className='focus-visible:ring-0 w-full'
                        type='tel'
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
                name='usermessage'
                render={({ field }) => (
                  <FormItem className='flex flex-col w-full'>
                    <FormLabel>
                      Maqsadingiz{' '}
                      <span className='font-semibold text-[#BD1033]'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Batafsil'
                        className='focus-visible:ring-0 w-full'
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                variant='ghost'
                disabled={isLoading}
                className='w-full flex items-center justify-center gap-2 bg-[#BD1033] text-white hover:bg-[#A00C2B] py-4 rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isLoading ? (
                  <>
                    <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white'></div>
                    <span>Yuborilmoqda...</span>
                  </>
                ) : (
                  <>
                    <span>Yuborish</span>
                    <img className='w-6 h-6' src={paperPlaneImage} alt='' />
                  </>
                )}
              </Button>

              {/* Form ostida xabar ko'rsatish */}
              {message && (
                <div
                  className={`mt-4 p-3 rounded-lg text-center text-sm font-medium ${
                    message.includes('✅')
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >
                  {message}
                </div>
              )}
            </form>
          </Form>
        </div>

        <div className='w-full md:w-1/2 bg-white rounded-lg overflow-hidden shadow-lg'>
          <div className='h-60 sm:h-72 md:h-80 w-full'>
            <iframe
              src='https://www.google.com/maps?q=40.786553,72.382894&hl=ru&z=14&output=embed'
              width='100%'
              height='100%'
              style={{ border: 0 }}
              allowFullScreen
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
