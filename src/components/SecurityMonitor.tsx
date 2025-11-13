import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, AlertTriangle, Activity, Users, Clock, Eye } from 'lucide-react';
import { useSecurity } from '@/hooks/useSecurity';

interface SecurityStats {
  events: Array<{
    timestamp: number;
    type: string;
    details: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
  }>;
  submissionCount: number;
  lastSubmissionTime: number;
}

export const SecurityMonitor: React.FC = () => {
  const { getSecurityStats, clearSecurityData } = useSecurity();
  const [stats, setStats] = useState<SecurityStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStats = () => {
      try {
        const securityStats = getSecurityStats();
        setStats(securityStats);
      } catch (error) {
        console.error('Failed to load security stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
    const interval = setInterval(loadStats, 10000); // Update every 10 seconds
    return () => clearInterval(interval);
  }, [getSecurityStats]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return '🚨';
      case 'high': return '⚠️';
      case 'medium': return '⚡';
      case 'low': return 'ℹ️';
      default: return '📋';
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <span>Loading security data...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!stats) {
    return (
      <Card>
        <CardContent className="p-6">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Unable to load security monitoring data
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  const recentEvents = stats.events.slice(0, 10);
  const criticalEvents = stats.events.filter(e => e.severity === 'critical' || e.severity === 'high');
  const timeSinceLastSubmission = stats.lastSubmissionTime
    ? Math.floor((Date.now() - stats.lastSubmissionTime) / 1000)
    : 0;

  return (
    <div className="space-y-6">
      {/* Security Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-primary" />
            <span>Security Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary">{stats.events.length}</div>
              <div className="text-sm text-muted-foreground">Total Events</div>
            </div>
            <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">{criticalEvents.length}</div>
              <div className="text-sm text-red-600 dark:text-red-400">Critical Events</div>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.submissionCount}</div>
              <div className="text-sm text-blue-600 dark:text-blue-400">Form Submissions</div>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {timeSinceLastSubmission < 60 ? `${timeSinceLastSubmission}s` : `${Math.floor(timeSinceLastSubmission / 60)}m`}
              </div>
              <div className="text-sm text-green-600 dark:text-green-400">Last Activity</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Security Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-primary" />
            <span>Recent Security Events</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentEvents.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Shield className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No security events detected</p>
              <p className="text-sm">All systems operating normally</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{getSeverityIcon(event.severity)}</span>
                    <div>
                      <div className="font-medium text-sm">{event.type.replace('_', ' ').toUpperCase()}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(event.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                  <Badge variant={getSeverityColor(event.severity) as "default" | "secondary" | "destructive" | "outline"}>
                    {event.severity.toUpperCase()}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Eye className="w-5 h-5 text-primary" />
            <span>Security Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={clearSecurityData}
              className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
            >
              <Clock className="w-4 h-4 mr-2" />
              Clear Security Data
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.reload()}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              <Activity className="w-4 h-4 mr-2" />
              Refresh Status
            </Button>
          </div>
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Security Status:</strong> {criticalEvents.length > 0 ? '⚠️ Issues Detected' : '✅ All Clear'}
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
              Monitoring active • Last updated: {new Date().toLocaleTimeString()}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
