import React, { useState } from 'react';
import Section from '../../components/ui/Section';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { Image as ImageIcon, Loader } from 'lucide-react';

export default function ImageGeneration() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Add AI image generation logic here
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <Section
      title="AI Image Generation"
      subtitle="Transform your ideas into stunning visuals with our AI-powered image generation tool"
    >
      <Card className="max-w-2xl mx-auto p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
              Describe your image
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-primary/50"
              rows={4}
              placeholder="Enter a detailed description of the image you want to generate..."
            />
          </div>
          <Button type="submit" disabled={loading || !prompt}>
            {loading ? (
              <Loader className="animate-spin h-5 w-5 mr-2" />
            ) : (
              <ImageIcon className="h-5 w-5 mr-2" />
            )}
            Generate Image
          </Button>
        </form>
      </Card>
    </Section>
  );
}