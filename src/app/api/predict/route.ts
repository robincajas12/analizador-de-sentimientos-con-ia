import { NextResponse } from 'next/server';
import type { Sentiment } from '@/app/types';

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== 'string' || !text.trim()) {
      return NextResponse.json(
        { error: 'Text input is required and must be a non-empty string.' },
        { status: 400 }
      );
    }
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 500));

    // Simulation logic
    const p1 = Math.random();
    const p2 = Math.random();
    const p3 = Math.random();
    const total = p1 + p2 + p3;
    const probs: Record<Sentiment, number> = {
      Positive: p1 / total,
      Negative: p2 / total,
      Neutral: p3 / total
    };

    const sentiment = Object.keys(probs).reduce((a, b) => probs[a as Sentiment] > probs[b as Sentiment] ? a : b) as Sentiment;
    const confidence = probs[sentiment];

    const probabilities = [
        { name: 'Positive' as Sentiment, value: probs.Positive },
        { name: 'Negative' as Sentiment, value: probs.Negative },
        { name: 'Neutral' as Sentiment, value: probs.Neutral },
    ];
    
    const result = {
        sentiment,
        confidence: confidence,
        probabilities,
    };

    return NextResponse.json(result);

  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body.' },
      { status: 400 }
    );
  }
}
