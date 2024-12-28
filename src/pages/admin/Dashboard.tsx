import React from 'react';
import { useNavigate } from 'react-router-dom';
import Section from '../../components/ui/Section';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Plus, Settings, Users, FileText } from 'lucide-react';
import AuthGuard from '../../components/auth/AuthGuard';
import SEO from '../../components/common/SEO';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <AuthGuard requireAdmin>
      <SEO 
        title="Admin Dashboard" 
        description="Manage your website content and settings"
      />
      <Section title="Admin Dashboard">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Blog Posts</h3>
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <Button onClick={() => navigate('/blog/create')} className="w-full">
              <Plus className="h-5 w-5 mr-2" />
              Create New Post
            </Button>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Users</h3>
              <Users className="h-6 w-6 text-primary" />
            </div>
            <Button onClick={() => navigate('/admin/users')} className="w-full">
              Manage Users
            </Button>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Settings</h3>
              <Settings className="h-6 w-6 text-primary" />
            </div>
            <Button onClick={() => navigate('/admin/settings')} className="w-full">
              Site Settings
            </Button>
          </Card>
        </div>
      </Section>
    </AuthGuard>
  );
}