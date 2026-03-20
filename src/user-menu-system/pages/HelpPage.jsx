import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HelpPage.module.css';

const HelpPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const categories = [
    { id: 'all', name: 'All Topics', icon: '📚', color: '#667eea' },
    { id: 'getting-started', name: 'Getting Started', icon: '🚀', color: '#10b981' },
    { id: 'account', name: 'Account & Profile', icon: '👤', color: '#f59e0b' },
    { id: 'dashboard', name: 'Dashboard', icon: '📊', color: '#ef4444' },
    { id: 'projects', name: 'Projects & Tasks', icon: '📋', color: '#8b5cf6' },
    { id: 'reports', name: 'Reports', icon: '📈', color: '#06b6d4' }
  ];

  const faqs = [
    {
      id: 1,
      category: 'getting-started',
      question: 'How do I create my first project?',
      tags: ['projects', 'beginner'],
      answer: 'To create your first project, navigate to the dashboard and click on "Create New Item". Select "Project" as the category, fill in the title and description, then click "Create Item". Your project will appear in your dashboard and you can start adding tasks to it.'
    },
    {
      id: 2,
      category: 'account',
      question: 'How do I reset my password?',
      tags: ['password', 'security'],
      answer: 'To reset your password, go to your Account Settings page, scroll down to the "Security" section, and click "Change Password". You\'ll need to enter your current password and then your new password twice for confirmation.'
    },
    {
      id: 3,
      category: 'dashboard',
      question: 'What do the statistics on my dashboard mean?',
      tags: ['dashboard', 'metrics'],
      answer: 'Your dashboard shows key metrics including total activities (all your actions), today\'s activities (actions from today), weekly growth (percentage increase in activity), and completion rate (percentage of tasks completed). These help you track your productivity and progress.'
    },
    {
      id: 4,
      category: 'projects',
      question: 'How do I assign priorities to my tasks?',
      tags: ['tasks', 'priority'],
      answer: 'When creating or editing a task, you can set its priority level: Low (green), Medium (yellow), High (orange), or Urgent (red). This helps you organize your work and focus on what matters most. Priority colors are displayed throughout the interface for quick identification.'
    },
    {
      id: 5,
      category: 'reports',
      question: 'How do I generate and export reports?',
      tags: ['reports', 'export'],
      answer: 'Go to the Reports page from your dashboard. Select the type of report you want (Overview, Activity, Performance, etc.), choose your date range, and configure any filters. Click "Generate Report" to create it, then use the export options to download in PDF, Excel, or CSV format.'
    },
    {
      id: 6,
      category: 'getting-started',
      question: 'How do I navigate between different sections?',
      tags: ['navigation', 'beginner'],
      answer: 'Use the dashboard as your central hub. From there, you can access all features through the quick action buttons or the main navigation. Each page has a "Back to Dashboard" button for easy navigation. The dashboard also shows your recent activities and provides shortcuts to frequently used features.'
    },
    {
      id: 7,
      category: 'account',
      question: 'How do I update my profile information?',
      tags: ['profile', 'settings'],
      answer: 'Click on "Update Profile" from your dashboard or go directly to the Profile page. You can update your name, email, avatar, and other personal information. Don\'t forget to save your changes before leaving the page.'
    },
    {
      id: 8,
      category: 'dashboard',
      question: 'What are the different activity types I see?',
      tags: ['activities', 'dashboard'],
      answer: 'Activities include: Login (when you sign in), Logout (when you sign out), View (pages you visit), Edit (changes you make), Create (new items you add), and Delete (items you remove). These help you track your engagement and usage patterns.'
    }
  ];

  const quickActions = [
    {
      title: 'Contact Support',
      description: 'Get help from our support team',
      icon: '💬',
      action: () => window.open('mailto:support@muamokel.com?subject=Support Request', '_blank')
    },
    {
      title: 'Documentation',
      description: 'Browse our detailed guides',
      icon: '📖',
      action: () => navigate('/user-menu/help')
    },
    {
      title: 'Video Tutorials',
      description: 'Watch step-by-step guides',
      icon: '🎥',
      action: () => window.open('https://youtube.com/muamokel', '_blank')
    },
    {
      title: 'Community Forum',
      description: 'Connect with other users',
      icon: '👥',
      action: () => window.open('https://forum.muamokel.com', '_blank')
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = !searchQuery ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleBack = () => {
    navigate('/user-dashboard');
  };

  const toggleFaq = (faqId) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  return (
    <div className="help-page">
      <div className="help-header">
        <div className="header-content">
          <h1>Help & Support</h1>
          <p>Find answers to your questions and get the help you need</p>
        </div>
        <button
          className="btn btn-outline back-btn"
          onClick={handleBack}
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Help Controls */}
      <div className="help-controls">
        {/* Search */}
        <div className="search-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button className="search-btn">🔍</button>
          </div>
        </div>

        {/* Categories */}
        <div className="categories-section">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
              style={{ '--category-color': category.color }}
            >
              <span className="category-icon">{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions-section">
        <h3>Quick Actions</h3>
        <div className="quick-actions-grid">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className="quick-action-card"
              onClick={action.action}
            >
              <div className="action-icon">{action.icon}</div>
              <div className="action-content">
                <h4>{action.title}</h4>
                <p>{action.description}</p>
              </div>
              <div className="action-arrow">→</div>
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <div className="faq-header">
          <h3>Frequently Asked Questions</h3>
          <p>{filteredFaqs.length} {filteredFaqs.length === 1 ? 'result' : 'results'} found</p>
        </div>

        <div className="faq-list">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map(faq => (
              <div key={faq.id} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => toggleFaq(faq.id)}
                >
                  <h4>{faq.question}</h4>
                  <div className="faq-tags">
                    {faq.tags.map(tag => (
                      <span key={tag} className="faq-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>
                {expandedFaq === faq.id && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h4>No results found</h4>
              <p>Try adjusting your search terms or browse all categories.</p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Contact Section */}
      <div className="contact-section">
        <div className="contact-card">
          <div className="contact-icon">🆘</div>
          <div className="contact-content">
            <h3>Still need help?</h3>
            <p>Can't find what you're looking for? Our support team is here to help you with any questions or issues you might have.</p>
            <div className="contact-methods">
              <button
                className="contact-method"
                onClick={() => window.open('mailto:support@muamokel.com?subject=Support Request', '_blank')}
              >
                📧 Email Support
              </button>
              <button
                className="contact-method"
                onClick={() => window.open('tel:+1234567890', '_blank')}
              >
                📞 Call Support
              </button>
              <button
                className="contact-method"
                onClick={() => window.open('https://chat.muamokel.com', '_blank')}
              >
                💬 Live Chat
              </button>
              <button
                className="contact-method"
                onClick={() => window.open('https://status.muamokel.com', '_blank')}
              >
                📊 System Status
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
