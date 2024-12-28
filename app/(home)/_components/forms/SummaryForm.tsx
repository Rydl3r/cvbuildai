'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useResumeContext } from '@/context/resume-info-provider';
import useUpdateDocument from '@/features/document/use-update-document';
import { toast } from '@/hooks/use-toast';
import { AIChatSession } from '@/lib/google-ai-model';
import { generateThumbnail } from '@/lib/helper';
import { ResumeDataType } from '@/types/resume.type';
import { Loader, Sparkles } from 'lucide-react';
import React, { useCallback, useState } from 'react';

interface GeneratesSummaryType {
  fresher: string;
  mid: string;
  experienced: string;
}

const prompt = `Назва посади: {jobTitle}. На основі назви посади, будь ласка, створіть стислі 
та повні резюме для мого CV у форматі JSON, враховуючи такі рівні досвіду: початківець, середній та досвідчений. 
Кожне резюме повинно бути обмежене 3-4 рядками, відображаючи особистий тон та демонструючи конкретні відповідні 
мови програмування, технології, фреймворки та методології без будь-яких заповнювачів або прогалин. 
Переконайтеся, що резюме є захоплюючими та адаптованими для підкреслення унікальних сильних сторін, 
прагнень та внесків у спільні проекти, демонструючи чітке розуміння ролі та галузевих стандартів.`;

const SummaryForm = (props: { handleNext: () => void }) => {
  const { handleNext } = props;
  const { resumeInfo, onUpdate } = useResumeContext();

  const { mutateAsync, isPending } = useUpdateDocument();

  const [loading, setLoading] = useState(false);
  const [aiGeneratedSummary, setAiGeneratedSummary] =
    useState<GeneratesSummaryType | null>(null);

  const handleChange = (e: { target: { value: string } }) => {
    const { value } = e.target;
    const resumeDataInfo = resumeInfo as ResumeDataType;
    const updatedInfo = {
      ...resumeDataInfo,
      summary: value,
    };
    onUpdate(updatedInfo);
  };

  const handleSubmit = useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault();
      if (!resumeInfo) return;
      const thumbnail = await generateThumbnail();
      const currentNo = resumeInfo?.currentPosition
        ? resumeInfo?.currentPosition + 1
        : 1;

      await mutateAsync(
        {
          currentPosition: currentNo,
          thumbnail: thumbnail,
          summary: resumeInfo?.summary,
        },
        {
          onSuccess: () => {
            toast({
              title: 'Успіх',
              description: 'Резюме успішно оновлено',
            });
            handleNext();
          },
          onError() {
            toast({
              title: 'Помилка',
              description: 'Не вдалося оновити резюме',
              variant: 'destructive',
            });
          },
        }
      );
    },
    [resumeInfo]
  );

  const GenerateSummaryFromAI = async () => {
    try {
      const jobTitle = resumeInfo?.personalInfo?.jobTitle;
      if (!jobTitle) return;
      setLoading(true);
      const PROMPT = prompt.replace('{jobTitle}', jobTitle);
      const result = await AIChatSession.sendMessage(PROMPT);
      const responseText = await result.response.text();
      setAiGeneratedSummary(JSON?.parse(responseText));
    } catch (error) {
      toast({
        title: 'Не вдалося створити резюме',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = useCallback(
    (summary: string) => {
      if (!resumeInfo) return;
      const resumeDataInfo = resumeInfo as ResumeDataType;
      const updatedInfo = {
        ...resumeDataInfo,
        summary: summary,
      };
      onUpdate(updatedInfo);
      setAiGeneratedSummary(null);
    },
    [onUpdate, resumeInfo]
  );

  return (
    <div>
      <div className='w-full'>
        <h2 className='font-bold text-lg'>Опис</h2>
        <p className='text-sm'>Додайте опис для вашого резюме</p>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className='flex items-end justify-between'>
            <Label>Додати опис</Label>
            <Button
              variant='outline'
              type='button'
              className='gap-1'
              disabled={loading || isPending}
              onClick={() => GenerateSummaryFromAI()}
            >
              <Sparkles size='15px' className='text-purple-500' />
              Згенерувати за допомогою AI
            </Button>
          </div>
          <Textarea
            className='mt-5 min-h-36'
            required
            value={resumeInfo?.summary || ''}
            onChange={handleChange}
          />

          {aiGeneratedSummary && (
            <div>
              <h5 className='font-semibold text-[15px] my-4'>Пропозиції</h5>
              {Object?.entries(aiGeneratedSummary)?.map(
                (
                  [
                    experienceType,
                    {
                      summary: [summary],
                    },
                  ],
                  index
                ) => (
                  <Card
                    role='button'
                    key={index}
                    className='my-4 bg-primary/5 shadow-none
                            border-primary/30
                          '
                    onClick={() => handleSelect(summary)}
                  >
                    <CardHeader className='py-2'>
                      <CardTitle className='font-semibold text-md'>
                        {experienceType?.charAt(0)?.toUpperCase() +
                          experienceType?.slice(1)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className='text-sm'>
                      <p>{summary}</p>
                    </CardContent>
                  </Card>
                )
              )}
            </div>
          )}

          <Button
            className='mt-4'
            type='submit'
            disabled={
              isPending || loading || resumeInfo?.status === 'archived'
                ? true
                : false
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

export default SummaryForm;
