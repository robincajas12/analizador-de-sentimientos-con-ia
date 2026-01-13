
'use server';

import type { AnalysisResult, Sentiment, Post, Comment } from '@/app/types';
import { samplePost } from '@/lib/sample-data';

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

  // Simulate network delay and processing time
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Simulate a model prediction
  const p1 = Math.random();
  const p2 = Math.random();
  const p3 = Math.random();
  const total = p1 + p2 + p3;
  const probs: Record<Sentiment, number> = {
    Positive: p1 / total,
    Negative: p2 / total,
    Neutral: p3 / total,
  };

  const sentiment = Object.keys(probs).reduce((a, b) =>
    probs[a as Sentiment] > probs[b as Sentiment] ? a : b
  ) as Sentiment;
  const confidence = probs[sentiment];

  const probabilities = [
    { name: 'Positive' as Sentiment, value: probs.Positive },
    { name: 'Negative' as Sentiment, value: probs.Negative },
    { name: 'Neutral' as Sentiment, value: probs.Neutral },
  ];

  return {
    sentiment,
    confidence: confidence,
    probabilities,
  };
}
