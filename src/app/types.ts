
export type Sentiment = 'Positive' | 'Negative' | 'Neutral';

export type AnalysisResult = {
  sentiment: Sentiment;
  confidence: number;
  probabilities: {
    name: Sentiment;
    value: number;
  }[];
};

export type User = {
  name: string;
  avatarUrl: string;
  handle: string;
};

export type Post = {
  id: string;
  author: User;
  content: string;
  timestamp: string;
  stats: {
    likes: number;
    comments: number;
    shares: number;
  };
};

export type Comment = {
  id: string;
  author: User;
  content: string;
  timestamp: string;
};
