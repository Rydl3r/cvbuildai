import { Button } from '@/components/ui/button';
import { Frown } from 'lucide-react';
import React from 'react';

const Error = () => {
  return (
    <div
      className='
   h-screen flex flex-col items-center
   space-y-4 justify-center
    '
    >
      <div
        className='h-screen flex flex-col
        items-center space-y-4 justify-center

        '
      >
        <Frown size='80px' />
        <h2 className='text-xl font-semibold'>Ви не маєте доступу</h2>
        <Button className='min-w-64'>Запит на доступ</Button>
      </div>

      <div className='shrink-0 min-h-14 text-center'>
        <p className='text-xs'>Компанія від </p>
        <h5
          className='font-black 
         text-[20px] text-primary'
        >
          {' '}
          CVbuild.ai
        </h5>
      </div>
    </div>
  );
};

export default Error;
