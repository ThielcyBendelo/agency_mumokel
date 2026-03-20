import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './CreatePage.module.css';

const CreatePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    dueDate: '',
    tags: []
  });

  const [currentTag, setCurrentTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { id: 'project', name: 'Project', icon: '📁', color: '#667eea' },
    { id: 'task', name: 'Task', icon: '✅', color: '#10b981' },
    { id: 'idea', name: 'Idea', icon: '💡', color: '#f59e0b' },
    { id: 'bug', name: 'Bug', icon: '🐛', color: '#ef4444' },
    { id: 'feature', name: 'Feature', icon: '🚀', color: '#8b5cf6' },
    { id: 'meeting', name: 'Meeting', icon: '📅', color: '#06b6d4' }
  ];

  const priorities = [
    { id: 'low', name: 'Low', color: '#10b981' },
    { id: 'medium', name: 'Medium', color: '#f59e0b' },
    { id: 'high', name: 'High', color: '#ef4444' },
    { id: 'urgent', name: 'Urgent', color: '#dc2626' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategorySelect = (categoryId) => {
    setFormData(prev => ({
      ...prev,
      category: categoryId
    }));
  };

  const handlePrioritySelect = (priorityId) => {
    setFormData(prev => ({
      ...prev,
      priority: priorityId
    }));
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would typically send the data to your backend
      // For now, we'll simulate a successful creation
      await new Promise(resolve => setTimeout(resolve, 1500));

      alert('Item created successfully!');
      navigate('/user-dashboard');
    } catch (error) {
      console.error('Error creating item:', error);
      alert('Failed to create item. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate('/user-dashboard');
  };

  const selectedCategory = categories.find(cat => cat.id === formData.category);
  const selectedPriority = priorities.find(pri => pri.id === formData.priority);

  return (
    <div className="create-page">
      <div className="create-header">
        <div className="header-content">
          <h1>Create New Item</h1>
          <p>Add a new project, task, or idea to your workspace</p>
        </div>
        <button
          className="btn btn-outline back-btn"
          onClick={handleBack}
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="create-container">
        {/* Main Form */}
        <div className="create-form-section">
          <div className="form-header">
            <h2>Item Details</h2>
            <p>Fill in the information for your new item</p>
          </div>

          <form className="create-form" onSubmit={handleSubmit}>
            {/* Title */}
            <div className="form-group">
              <label htmlFor="title">Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter a descriptive title"
                required
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="form-textarea"
                placeholder="Provide additional details..."
                rows="4"
              />
            </div>

            {/* Category */}
            <div className="form-group">
              <label>Category *</label>
              <div className="category-grid">
                {categories.map(category => (
                  <button
                    key={category.id}
                    type="button"
                    className={`category-option ${formData.category === category.id ? 'active' : ''}`}
                    onClick={() => handleCategorySelect(category.id)}
                    style={{ '--category-color': category.color }}
                  >
                    <span className="category-icon">{category.icon}</span>
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Priority */}
            <div className="form-group">
              <label>Priority</label>
              <div className="priority-options">
                {priorities.map(priority => (
                  <button
                    key={priority.id}
                    type="button"
                    className={`priority-option ${formData.priority === priority.id ? 'active' : ''}`}
                    onClick={() => handlePrioritySelect(priority.id)}
                    style={{ '--priority-color': priority.color }}
                  >
                    {priority.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Due Date */}
            <div className="form-group">
              <label htmlFor="dueDate">Due Date</label>
              <input
                type="datetime-local"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            {/* Tags */}
            <div className="form-group">
              <label>Tags</label>
              <div className="tags-input-container">
                <input
                  type="text"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  className="form-input tag-input"
                  placeholder="Add a tag..."
                />
                <button
                  type="button"
                  className="btn btn-secondary add-tag-btn"
                  onClick={handleAddTag}
                >
                  Add
                </button>
              </div>
              {formData.tags.length > 0 && (
                <div className="tags-list">
                  {formData.tags.map(tag => (
                    <span key={tag} className="tag">
                      {tag}
                      <button
                        type="button"
                        className="remove-tag"
                        onClick={() => handleRemoveTag(tag)}
                        aria-label={`Remove ${tag} tag`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="form-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleBack}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting || !formData.title.trim() || !formData.category}
              >
                {isSubmitting ? 'Creating...' : 'Create Item'}
              </button>
            </div>
          </form>
        </div>

        {/* Preview Section */}
        <div className="preview-section">
          <div className="preview-header">
            <h3>Preview</h3>
          </div>
          <div className="preview-card">
            <div className="preview-title">
              {formData.title || 'Your item title will appear here'}
            </div>
            <div className="preview-meta">
              {selectedCategory && (
                <span className="preview-category">
                  {selectedCategory.icon} {selectedCategory.name}
                </span>
              )}
              {selectedPriority && (
                <span
                  className="preview-priority"
                  style={{ color: selectedPriority.color }}
                >
                  {selectedPriority.name}
                </span>
              )}
            </div>
            {formData.tags.length > 0 && (
              <div className="preview-tags">
                {formData.tags.map(tag => (
                  <span key={tag} className="preview-tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="preview-description">
              {formData.description || 'Your description will appear here...'}
            </div>
            {formData.dueDate && (
              <div className="preview-due-date">
                Due: {new Date(formData.dueDate).toLocaleString()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
