import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ErrorBoundary from './components/layout/ErrorBoundary';
import { HelmetProvider } from 'react-helmet-async';

// Lazy load pages
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Services = React.lazy(() => import('./pages/Services'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Blog = React.lazy(() => import('./pages/Blog'));
const CreatePost = React.lazy(() => import('./pages/blog/CreatePost'));
const ImageGeneration = React.lazy(() => import('./pages/ai/ImageGeneration'));
const TextAnalysis = React.lazy(() => import('./pages/ai/TextAnalysis'));

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route
                index
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <Home />
                  </Suspense>
                }
              />
              <Route
                path="about"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <About />
                  </Suspense>
                }
              />
              <Route
                path="services"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <Services />
                  </Suspense>
                }
              />
              <Route
                path="contact"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <Contact />
                  </Suspense>
                }
              />
              <Route
                path="blog"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <Blog />
                  </Suspense>
                }
              />
              <Route
                path="blog/create"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <CreatePost />
                  </Suspense>
                }
              />
              <Route
                path="ai/image-generation"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <ImageGeneration />
                  </Suspense>
                }
              />
              <Route
                path="ai/text-analysis"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <TextAnalysis />
                  </Suspense>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;