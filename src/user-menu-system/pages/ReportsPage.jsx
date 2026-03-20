import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './ReportsPage.module.css';

const ReportsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [selectedReport, setSelectedReport] = useState('overview');
  const [dateRange, setDateRange] = useState('30d');
  const [isGenerating, setIsGenerating] = useState(false);

  const reports = [
    {
      id: 'overview',
      name: 'Overview Report',
      icon: '📊',
      description: 'Comprehensive dashboard analytics',
      color: '#667eea'
    },
    {
      id: 'activity',
      name: 'Activity Report',
      icon: '📈',
      description: 'User activity and engagement metrics',
      color: '#10b981'
    },
    {
      id: 'performance',
      name: 'Performance Report',
      icon: '⚡',
      description: 'System performance and efficiency',
      color: '#f59e0b'
    },
    {
      id: 'user',
      name: 'User Report',
      icon: '👥',
      description: 'User behavior and demographics',
      color: '#ef4444'
    },
    {
      id: 'financial',
      name: 'Financial Report',
      icon: '💰',
      description: 'Revenue and financial metrics',
      color: '#8b5cf6'
    },
    {
      id: 'custom',
      name: 'Custom Report',
      icon: '🔧',
      description: 'Build your own custom report',
      color: '#06b6d4'
    }
  ];

  const dateRanges = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: '1y', label: 'Last year' },
    { value: 'custom', label: 'Custom range' }
  ];

  const handleGenerateReport = async () => {
    setIsGenerating(true);

    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 2000));

      // In a real app, this would generate and download the report
      alert(`Report "${reports.find(r => r.id === selectedReport)?.name}" generated successfully!`);

    } catch (error) {
      console.error('Error generating report:', error);
      alert('Failed to generate report. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBack = () => {
    navigate('/user-dashboard');
  };

  const selectedReportData = reports.find(r => r.id === selectedReport);

  return (
    <div className="reports-page">
      <div className="reports-header">
        <div className="header-content">
          <h1>Reports & Analytics</h1>
          <p>Generate comprehensive reports and gain insights into your data</p>
        </div>
        <button
          className="btn btn-outline back-btn"
          onClick={handleBack}
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="reports-container">
        {/* Report Selection */}
        <div className="reports-sidebar">
          <div className="sidebar-header">
            <h3>Report Types</h3>
          </div>
          <div className="report-list">
            {reports.map(report => (
              <button
                key={report.id}
                className={`report-option ${selectedReport === report.id ? 'active' : ''}`}
                onClick={() => setSelectedReport(report.id)}
                style={{ '--report-color': report.color }}
              >
                <span className="report-icon">{report.icon}</span>
                <div className="report-info">
                  <span className="report-name">{report.name}</span>
                  <span className="report-description">{report.description}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Report Configuration */}
        <div className="reports-main">
          <div className="report-config">
            <div className="config-header">
              <h2>{selectedReportData?.name}</h2>
              <p>{selectedReportData?.description}</p>
            </div>

            <div className="config-options">
              {/* Date Range */}
              <div className="config-group">
                <label className="config-label">Time Period</label>
                <select
                  className="config-select"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  {dateRanges.map(range => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Additional Filters */}
              <div className="config-group">
                <label className="config-label">Filters</label>
                <div className="filter-options">
                  <label className="filter-checkbox">
                    <input type="checkbox" defaultChecked />
                    Include inactive users
                  </label>
                  <label className="filter-checkbox">
                    <input type="checkbox" defaultChecked />
                    Include system activities
                  </label>
                  <label className="filter-checkbox">
                    <input type="checkbox" />
                    Detailed breakdowns
                  </label>
                </div>
              </div>

              {/* Export Options */}
              <div className="config-group">
                <label className="config-label">Export Format</label>
                <div className="export-options">
                  <label className="export-option">
                    <input type="radio" name="format" value="pdf" defaultChecked />
                    PDF Report
                  </label>
                  <label className="export-option">
                    <input type="radio" name="format" value="excel" />
                    Excel Spreadsheet
                  </label>
                  <label className="export-option">
                    <input type="radio" name="format" value="csv" />
                    CSV Data
                  </label>
                </div>
              </div>
            </div>

            <div className="config-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setSelectedReport('overview')}
              >
                Reset to Default
              </button>
              <button
                className="btn btn-primary"
                onClick={handleGenerateReport}
                disabled={isGenerating}
              >
                {isGenerating ? 'Generating...' : 'Generate Report'}
              </button>
            </div>
          </div>

          {/* Report Preview */}
          <div className="report-preview">
            <div className="preview-header">
              <h3>Report Preview</h3>
              <span className="preview-note">Sample data - Generate report for real data</span>
            </div>

            <div className="preview-content">
              {selectedReport === 'overview' && (
                <div className="preview-overview">
                  <div className="metric-grid">
                    <div className="metric-card">
                      <div className="metric-icon">👥</div>
                      <div className="metric-data">
                        <h4>1,247</h4>
                        <p>Total Users</p>
                      </div>
                    </div>
                    <div className="metric-card">
                      <div className="metric-icon">📊</div>
                      <div className="metric-data">
                        <h4>45,892</h4>
                        <p>Activities</p>
                      </div>
                    </div>
                    <div className="metric-card">
                      <div className="metric-icon">⚡</div>
                      <div className="metric-data">
                        <h4>98.5%</h4>
                        <p>Uptime</p>
                      </div>
                    </div>
                    <div className="metric-card">
                      <div className="metric-icon">💰</div>
                      <div className="metric-data">
                        <h4>$12,847</h4>
                        <p>Revenue</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedReport === 'activity' && (
                <div className="preview-activity">
                  <div className="activity-chart-placeholder">
                    <div className="chart-icon">📈</div>
                    <p>Activity trends over time</p>
                    <small>Chart will be generated in the full report</small>
                  </div>
                </div>
              )}

              {selectedReport === 'performance' && (
                <div className="preview-performance">
                  <div className="performance-metrics">
                    <div className="perf-item">
                      <span className="perf-label">Response Time</span>
                      <span className="perf-value">245ms</span>
                    </div>
                    <div className="perf-item">
                      <span className="perf-label">Error Rate</span>
                      <span className="perf-value">0.02%</span>
                    </div>
                    <div className="perf-item">
                      <span className="perf-label">Throughput</span>
                      <span className="perf-value">1,200 req/min</span>
                    </div>
                  </div>
                </div>
              )}

              {selectedReport === 'user' && (
                <div className="preview-user">
                  <div className="user-stats">
                    <div className="user-stat">
                      <h4>Active Users</h4>
                      <p>892</p>
                    </div>
                    <div className="user-stat">
                      <h4>New Signups</h4>
                      <p>47</p>
                    </div>
                    <div className="user-stat">
                      <h4>Retention Rate</h4>
                      <p>84%</p>
                    </div>
                  </div>
                </div>
              )}

              {selectedReport === 'financial' && (
                <div className="preview-financial">
                  <div className="financial-summary">
                    <div className="revenue-breakdown">
                      <h4>Revenue Breakdown</h4>
                      <div className="revenue-item">
                        <span>Subscriptions</span>
                        <span>$8,450</span>
                      </div>
                      <div className="revenue-item">
                        <span>One-time purchases</span>
                        <span>$3,240</span>
                      </div>
                      <div className="revenue-item">
                        <span>Services</span>
                        <span>$1,157</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedReport === 'custom' && (
                <div className="preview-custom">
                  <div className="custom-builder">
                    <p>Build your custom report by selecting metrics and filters above.</p>
                    <div className="custom-placeholder">
                      <div className="custom-icon">🔧</div>
                      <p>Custom report builder</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
