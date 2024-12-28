import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useResumeContext } from '@/context/resume-info-provider';
import useUpdateDocument from '@/features/document/use-update-document';
import { toast } from '@/hooks/use-toast';
import { Loader, MoreHorizontal, Redo, Trash2 } from 'lucide-react';
import { StatusType } from '@/types/resume.type';

const MoreOption = () => {
  const router = useRouter();
  const { resumeInfo, isLoading, onUpdate } = useResumeContext();

  const { mutateAsync, isPending } = useUpdateDocument();

  const handleClick = useCallback(
    async (status: StatusType) => {
      if (!resumeInfo) return;
      await mutateAsync(
        {
          status: status,
        },
        {
          onSuccess: () => {
            onUpdate({
              ...resumeInfo,
              status: status,
            });
            router.replace(`/dashboard/`);
            toast({
              title: 'Успіх',
              description: `Успішно переміщено до кошика`,
            });
          },
          onError() {
            toast({
              title: 'Помилка',
              description: 'Не вдалося оновити статус',
              variant: 'destructive',
            });
          },
        }
      );
    },
    [mutateAsync, onUpdate, resumeInfo, router]
  );

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='secondary'
            size='icon'
            className='bg-white border
             dark:bg-gray-800'
          >
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            {resumeInfo?.status === 'archived' ? (
              <Button
                variant='ghost'
                className='gap-1 !py-2 !cursor-pointer'
                disabled={isPending}
                onClick={() => handleClick('private')}
              >
                <Redo size='15px' />
                Відновити резюме
                {isPending && <Loader size='15px' className='animate-spin' />}
              </Button>
            ) : (
              <Button
                variant='ghost'
                className='gap-1  !py-2 !cursor-pointer'
                disabled={isPending}
                onClick={() => handleClick('archived')}
              >
                <Trash2 size='15px' />
                Перемістити до кошика
                {isPending && <Loader size='15px' className='animate-spin' />}
              </Button>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default MoreOption;
