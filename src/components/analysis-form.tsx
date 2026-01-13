'use client';
import { useFormStatus } from 'react-dom';
import { analyzeSentiment } from '@/app/actions';
import type { AnalysisResult } from '@/app/types';
import { useActionState, useEffect, useRef, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Facebook, Loader2, Twitter } from 'lucide-react';
import { RedditIcon } from '@/components/icons';

const samplePosts = {
    twitter: "Just had the most amazing experience with @NextJSTemplates! Their new themes are 🔥 #webdev #nextjs",
    facebook: "Feeling so grateful for my friends and family today. It's been a tough week, but their support means the world to me. ❤️",
    reddit: "r/programming: I've been using this new framework for a project, and it's been a complete nightmare. The documentation is sparse, the community is unresponsive, and it's full of bugs. Would not recommend."
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Analyze Text
    </Button>
  );
}

export function AnalysisForm({
  onAnalysisComplete,
}: {
  onAnalysisComplete: (result: AnalysisResult | { error: string } | null) => void;
}) {
  const [state, formAction] = useActionState(analyzeSentiment, null);
  const [textValue, setTextValue] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    onAnalysisComplete(state);
  }, [state, onAnalysisComplete]);
  
  const handleSampleClick = (sampleText: string) => {
    setTextValue(sampleText);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Analyze Text</CardTitle>
        <CardDescription>
          Enter text manually or use a sample social media post.
        </CardDescription>
      </CardHeader>
      <form ref={formRef} action={formAction} className="flex flex-col flex-grow">
        <CardContent className="space-y-4 flex-grow flex flex-col">
          <Textarea
            name="text"
            placeholder="Paste your text here..."
            className="min-h-[150px] resize-y flex-grow"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            required
          />
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium">Simulate post from:</span>
            <Button variant="outline" size="sm" type="button" onClick={() => handleSampleClick(samplePosts.twitter)}>
              <Twitter className="mr-2 h-4 w-4 text-sky-500" /> Twitter
            </Button>
            <Button variant="outline" size="sm" type="button" onClick={() => handleSampleClick(samplePosts.facebook)}>
              <Facebook className="mr-2 h-4 w-4 text-blue-600" /> Facebook
            </Button>
            <Button variant="outline" size="sm" type="button" onClick={() => handleSampleClick(samplePosts.reddit)}>
              <RedditIcon className="mr-2 h-4 w-4 text-orange-500" /> Reddit
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex-col sm:flex-row items-start sm:items-center gap-4">
          <SubmitButton />
          {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
        </CardFooter>
      </form>
    </Card>
  );
}
