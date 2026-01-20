'use server';

import type { AnalysisResult, Post, Comment } from '@/app/types';
import { samplePost } from '@/lib/sample-data';
import { analyze as analyzeWithAi } from '@/ai/flows/sentiment-flow';

export async function getPostFromUrl(
  url: string
): Promise<{ post: Post; comments: Comment[] } | { error: string }> {
  if (!url || !url.trim() || !url.startsWith('http')) {
    return { error: 'Please enter a valid URL.' };
  }
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In a real app, you would fetch and parse the URL here.
  // For now, we'll return the sample post regardless of the URL.
  return { post: samplePost.post, comments: samplePost.comments };
}

export async function analyzeSentiment(
  prevState: any,
  formData: FormData
): Promise<AnalysisResult | { error: string }> {
  const text = formData.get('text') as string;

  if (!text || !text.trim()) {
    return { error: 'Text input cannot be empty.' };
  }

  try {
    const result = await analyzeWithAi(text);
    return result;
  } catch (e: any) {
    console.error(e);
    // Check for specific Genkit/Google AI error messages if possible
    const errorMessage = e.message?.includes('blocked')
      ? 'The analysis was blocked due to safety settings. Please try again with different text.'
      : 'Analysis failed. The AI model may be temporarily unavailable.';
    return { error: errorMessage };
  }
}
