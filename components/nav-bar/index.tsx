import React from 'react';
import { ExternalLink } from 'lucide-react';
import {
  LoginLink,
  RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/components';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const NavBar = () => {
  return (
    <div className='shadow-sm w-full sticky top-0  bg-white dark:bg-gray-900 z-[9999]'>
      <div className='w-full mx-auto max-w-7xl p-3 px-5 flex items-center justify-between '>
        <h5 className='font-black text-lg text-primary'>CVbuild.ai</h5>
        <div className='flex items-center gap-4'>
          <LoginLink>
            <Button variant='outline'>Увійти</Button>
          </LoginLink>
          <RegisterLink>
            <Button>Почати</Button>
          </RegisterLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
