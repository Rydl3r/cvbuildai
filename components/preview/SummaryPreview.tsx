import { Skeleton } from '@/components/ui/skeleton';
import { ResumeDataType } from '@/types/resume.type';
import React, { FC } from 'react';

interface PropsType {
  resumeInfo: ResumeDataType | undefined;
  isLoading: boolean;
}

const SummaryPreview: FC<PropsType> = ({ resumeInfo, isLoading }) => {
  return (
    <div className='w-full min-h-10'>
      {isLoading ? (
        <Skeleton className='h-6 w-full' />
      ) : (
        <p className='text-[13px] !leading-4'>
          {resumeInfo?.summary || 'Введіть короткий опис вашої професії.'}
        </p>
      )}
    </div>
  );
};

export default SummaryPreview;
