import React from 'react';
import Section from '../../components/ui/Section';
import Card from '../../components/ui/Card';
import LoginForm from '../../components/auth/LoginForm';
import SEO from '../../components/common/SEO';

export default function Login() {
  return (
    <>
      <SEO 
        title="Login" 
        description="Sign in to your account to access all features"
      />
      <Section>
        <div className="max-w-md mx-auto">
          <Card className="p-6">
            <h1 className="text-2xl font-bold text-center mb-6">Welcome Back</h1>
            <LoginForm />
          </Card>
        </div>
      </Section>
    </>
  );
}