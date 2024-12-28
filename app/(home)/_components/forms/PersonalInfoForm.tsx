import React, { useCallback, useEffect } from 'react';
import { Loader } from 'lucide-react';
import { useResumeContext } from '@/context/resume-info-provider';
import { PersonalInfoType } from '@/types/resume.type';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import PersonalInfoSkeletonLoader from '@/components/skeleton-loader/personal-info-loader';
import { generateThumbnail } from '@/lib/helper';
import useUpdateDocument from '@/features/document/use-update-document';
import { toast } from '@/hooks/use-toast';

const initialState = {
  id: undefined,
  firstName: '',
  lastName: '',
  jobTitle: '',
  address: '',
  phone: '',
  email: '',
};

const PersonalInfoForm = (props: { handleNext: () => void }) => {
  const { handleNext } = props;
  const { resumeInfo, isLoading, onUpdate } = useResumeContext();
  const { mutateAsync, isPending } = useUpdateDocument();

  const [personalInfo, setPersonalInfo] =
    React.useState<PersonalInfoType>(initialState);

  useEffect(() => {
    if (!resumeInfo) {
      return;
    }
    if (resumeInfo?.personalInfo) {
      setPersonalInfo({
        ...(resumeInfo?.personalInfo || initialState),
      });
    }
  }, [resumeInfo?.personalInfo]);

  const handleChange = useCallback(
    (e: { target: { name: string; value: string } }) => {
      const { name, value } = e.target;

      setPersonalInfo({ ...personalInfo, [name]: value });

      if (!resumeInfo) return;

      onUpdate({
        ...resumeInfo,
        personalInfo: {
          ...resumeInfo.personalInfo,
          [name]: value,
        },
      });
    },
    [resumeInfo, onUpdate]
  );

  const handleSubmit = useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault();

      const thumbnail = await generateThumbnail();
      const currentNo = resumeInfo?.currentPosition
        ? resumeInfo?.currentPosition + 1
        : 1;
      await mutateAsync(
        {
          currentPosition: currentNo,
          thumbnail: thumbnail,
          personalInfo: personalInfo,
        },
        {
          onSuccess: () => {
            toast({
              title: 'Успіх',
              description: 'Особисту інформацію успішно оновлено',
            });
            handleNext();
          },
          onError: () => {
            toast({
              title: 'Помилка',
              description: 'Не вдалося оновити особисту інформацію',
              variant: 'destructive',
            });
          },
        }
      );
    },
    [resumeInfo, personalInfo]
  );

  if (isLoading) {
    return <PersonalInfoSkeletonLoader />;
  }

  return (
    <div>
      <div className='w-full'>
        <h2 className='font-bold text-lg'>Особиста інформація</h2>
        <p className='text-sm'>Почніть з особистої інформації</p>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div
            className='grid grid-cols-2 
          mt-5 gap-3'
          >
            <div>
              <Label className='text-sm'>Ім'я</Label>
              <Input
                name='firstName'
                required
                autoComplete='off'
                placeholder=''
                value={personalInfo?.firstName || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className='text-sm'>Прізвище</Label>
              <Input
                name='lastName'
                required
                autoComplete='off'
                placeholder=''
                value={personalInfo?.lastName || ''}
                onChange={handleChange}
              />
            </div>
            <div className='col-span-2'>
              <Label className='text-sm'>Посада</Label>
              <Input
                name='jobTitle'
                required
                autoComplete='off'
                placeholder=''
                value={personalInfo?.jobTitle || ''}
                onChange={handleChange}
              />
            </div>
            <div className='col-span-2'>
              <Label className='text-sm'>Адреса</Label>
              <Input
                name='address'
                required
                autoComplete='off'
                placeholder=''
                value={personalInfo?.address || ''}
                onChange={handleChange}
              />
            </div>
            <div className='col-span-2'>
              <Label className='text-sm'>Номер телефону</Label>
              <Input
                name='phone'
                required
                autoComplete='off'
                placeholder=''
                value={personalInfo?.phone || ''}
                onChange={handleChange}
              />
            </div>
            <div className='col-span-2'>
              <Label className='text-sm'>Електронна пошта</Label>
              <Input
                name='email'
                required
                autoComplete='off'
                placeholder=''
                value={personalInfo?.email || ''}
                onChange={handleChange}
              />
            </div>
          </div>

          <Button
            className='mt-4'
            type='submit'
            disabled={
              isPending || resumeInfo?.status === 'archived' ? true : false
            }
          >
            {isPending && <Loader size='15px' className='animate-spin' />}
            Зберегти зміни
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
