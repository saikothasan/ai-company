import React from 'react';
import Section from '../components/ui/Section';
import Scene from '../components/3d/Scene';
import Button from '../components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <>
      <Section className="bg-gradient-to-b from-primary/5 to-background pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Modern Solutions for the Digital Age
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Explore our cutting-edge AI tools and stay updated with our latest insights
              through our blog.
            </p>
            <div className="flex gap-4">
              <Button size="lg">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </motion.div>
          <Scene />
        </div>
      </Section>
    </>
  );
}