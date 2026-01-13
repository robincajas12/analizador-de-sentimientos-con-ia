'use client';

import { useState } from 'react';
import type { AnalysisResult } from '@/app/types';
import { AnalysisForm } from './analysis-form';
import { ResultsDisplay } from './results-display';

export function MainContent() {
  const [result, setResult] = useState<AnalysisResult | { error: string } | null>(null);

  const analysisResult = result && 'sentiment' in result ? result : null;

  return (
    <main className="flex-1 overflow-auto p-4 md:p-6">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 h-full">
        <AnalysisForm onAnalysisComplete={setResult} />
        <ResultsDisplay result={analysisResult} />
      </div>
    </main>
  );
}
