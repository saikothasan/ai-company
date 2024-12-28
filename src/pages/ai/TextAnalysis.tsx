import React, { useState } from 'react';
import Section from '../../components/ui/Section';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { FileText, Loader } from 'lucide-react';

export default function TextAnalysis() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<null | {
    sentiment: string;
    keywords: string[];
    summary: string;
  }>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Add text analysis logic here
    setTimeout(() => {
      setAnalysis({
        sentiment: 'Positive',
        keywords: ['example', 'keywords'],
        summary: 'Sample summary of the analyzed text.',
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <Section
      title="Text Analysis"
      subtitle="Analyze text content for sentiment, keywords, and get AI-powered summaries"
    >
      <Card className="max-w-2xl mx-auto p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-2">
              Enter text to analyze
            </label>
            <textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-primary/50"
              rows={6}
              placeholder="Paste your text here..."
            />
          </div>
          <Button type="submit" disabled={loading || !text}>
            {loading ? (
              <Loader className="animate-spin h-5 w-5 mr-2" />
            ) : (
              <FileText className="h-5 w-5 mr-2" />
            )}
            Analyze Text
          </Button>
        </form>

        {analysis && (
          <div className="mt-6 border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Analysis Results</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Sentiment</h4>
                <p>{analysis.sentiment}</p>
              </div>
              <div>
                <h4 className="font-medium">Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium">Summary</h4>
                <p>{analysis.summary}</p>
              </div>
            </div>
          </div>
        )}
      </Card>
    </Section>
  );
}