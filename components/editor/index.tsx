import React, { useState } from 'react';
import {
  EditorProvider,
  Editor,
  Toolbar,
  BtnBold,
  BtnItalic,
  BtnUnderline,
  BtnStrikeThrough,
  Separator,
  BtnNumberedList,
  BtnBulletList,
  BtnLink,
} from 'react-simple-wysiwyg';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Loader, Sparkles } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { AIChatSession } from '@/lib/google-ai-model';

const PROMPT = `Враховуючи назву посади "{jobTitle}",
 створіть 6-7 коротких і особистих пунктів у
  форматі HTML, які підкреслюють мої ключові
  навички, відповідні технології та значні
   внески в цій ролі. Не включайте саму назву
    посади у вихідні дані. Використовуй лише українську мову. Надайте лише пункти
     у вигляді ненумерованого списку <li>. 
     Відповідь надай у форматі об'єкту з ключем description, а значення - рядок з елементами <li>`;

const RichTextEditor = (props: {
  jobTitle: string | null;
  initialValue: string;
  onEditorChange: (e: any) => void;
}) => {
  const { jobTitle, initialValue, onEditorChange } = props;

  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(initialValue || '');

  const generateSummaryFromAI = async () => {
    try {
      if (!jobTitle) {
        toast({
          title: 'Необхідно вказати посаду',
          variant: 'destructive',
        });
        return;
      }
      setLoading(true);
      const prompt = PROMPT.replace('{jobTitle}', jobTitle);
      const result = await AIChatSession.sendMessage(prompt);
      const responseText = await result.response.text();
      const parsedResponse = JSON.parse(responseText);

      setValue(parsedResponse?.description);
      onEditorChange(parsedResponse?.description);
    } catch (error) {
      toast({
        title: 'Не вдалося згенерувати резюме',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className='flex items-center 
      justify-between my-2'
      >
        <Label>Опис досвіду</Label>
        <Button
          variant='outline'
          type='button'
          className='gap-1'
          disabled={loading}
          onClick={generateSummaryFromAI}
        >
          <>
            <Sparkles size='15px' className='text-purple-500' />
            Згенерувати за допомогою AI
          </>
          {loading && <Loader size='13px' className='animate-spin' />}
        </Button>
      </div>

      <EditorProvider>
        <Editor
          value={value}
          containerProps={{
            style: {
              resize: 'vertical',
              lineHeight: 1.2,
              fontSize: '13.5px',
            },
          }}
          onChange={(e) => {
            setValue(e.target.value);
            onEditorChange(e.target.value);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
};

export default RichTextEditor;
