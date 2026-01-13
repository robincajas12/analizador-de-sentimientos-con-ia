export type Sentiment = 'Positive' | 'Negative' | 'Neutral';

export type AnalysisResult = {
  sentiment: Sentiment;
  confidence: number;
  probabilities: {
    name: Sentiment;
    value: number;
  }[];
};
