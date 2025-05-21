import { Button } from '@/components/ui/button';
import { RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { ChevronRight, Video } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className='w-full'>
      <div className='hero-section w-full min-h-screen'>
        <div className='w-full flex flex-col items-center justify-center py-10 max-w-4xl mx-auto'>
          <div className='flex flex-col mt-5 items-center text-center'>
            <h1 className='text-6xl font-black'>
              <p>Отримайте роботу мрії з нашим резюме-білдером, який працює</p>
              <p>
                <span className='bg-gradient-to-r from-primary via-purple-300 to-primary bg-clip-text text-transparent animate-sparkle'>
                  на основі штучного інтелекту
                </span>
              </p>
            </h1>
            <p className=' block text-xl mt-3 font-medium text-black/70'>
              Створіть професійне резюме за допомогою нашого безкоштовного
              білдера та поділіться ним за допомогою посилання для спільного
              доступу.
            </p>
            <br />
            <div className='flex items-center gap-2'>
              <Button className='h-12 text-base font-medium min-w-32' asChild>
                <RegisterLink>Почати</RegisterLink>
              </Button>
            </div>
          </div>
        </div>
        <div className='w-full relative max-w-5xl mx-auto px-4 md:px-6 lg:px-8'>
          <div className='absolute top-10 left-1/2 transform -translate-x-1/2 w-full h-[400px] bg-gradient-to-r from-primary to-blue-500 rounded-full blur-3xl opacity-40 z-0' />
          <div className='w-full h-[400px] md:h-[500px] lg:h-[600px] shadow-lg bg-background'>
            <div className='relative w-full h-full'>
              <Image
                src='/images/resume_example.png'
                alt='Дашборд'
                fill
                className='object-contain w-full h-full transition hover:scale-105'
              />
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}
