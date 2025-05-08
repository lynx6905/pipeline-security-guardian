
import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface StatusCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatusCard = ({ title, value, icon, trend, className = '' }: StatusCardProps) => {
  return (
    <Card className={`relative border border-gray-200 dark:border-gray-800 ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            {trend && (
              <div className="flex items-center mt-1">
                <span
                  className={`text-xs ${
                    trend.isPositive ? 'text-security-low' : 'text-security-high'
                  }`}
                >
                  {trend.isPositive ? '↓' : '↑'} {Math.abs(trend.value)}%
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">vs last scan</span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-full ${className}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusCard;
