'use client';
import { Skeleton } from '@/components/ui/skeleton';
import { INITIAL_THEME_COLOR } from '@/lib/helper';
import { ResumeDataType } from '@/types/resume.type';
import React, { FC } from 'react';

interface PropsType {
  resumeInfo: ResumeDataType | undefined;
  isLoading: boolean;
}

const PersonalInfo: FC<PropsType> = ({ resumeInfo, isLoading }) => {
  const themeColor = resumeInfo?.themeColor || INITIAL_THEME_COLOR;

  if (isLoading) {
    return <SkeletonLoader />;
  }
  return (
    <div className='w-full min-h-14'>
      <h2
        className='
        font-bold text-xl text-center
      '
        style={{
          color: themeColor,
        }}
      >
        {resumeInfo?.personalInfo?.firstName || "Ім'я"}{' '}
        {resumeInfo?.personalInfo?.lastName || 'Прізвище'}
      </h2>
      <h5 className='text-center text-sm font-medium'>
        {resumeInfo?.personalInfo?.jobTitle || 'Назва посади'}
      </h5>
      <p
        className='text-center font-normal
            text-[13px]
          '
      >
        {resumeInfo?.personalInfo?.address || 'Адреса'}
      </p>

      <div className='flex items-center justify-between pt-3'>
        <h5 className='font-normal text-[13px]'>
          {resumeInfo?.personalInfo?.phone || 'Номер телефону'}
        </h5>
        <h5 className='font-normal text-[13px]'>
          {resumeInfo?.personalInfo?.email || 'Електронна адреса'}
        </h5>
      </div>

      <hr
        className='
          border-[1.5px] my-2
          '
        style={{
          borderColor: themeColor,
        }}
      />
    </div>
  );
};

const SkeletonLoader = () => {
  return (
    <div className='w-full min-h-14'>
      <Skeleton className='h-6 w-1/2 mx-auto mb-2' />
      <Skeleton className='h-6 w-1/4 mx-auto mb-2' />
      <Skeleton className='h-6 w-1/3 mx-auto mb-2' />
      <div className='flex justify-between pt-3'>
        <Skeleton className='h-3 w-1/4' />
        <Skeleton className='h-3 w-1/4' />
      </div>
      <Skeleton className='h-[1.5] w-full my-2' />
    </div>
  );
};

export default PersonalInfo;
