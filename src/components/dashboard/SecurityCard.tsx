
import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SecurityCardProps {
  title: string;
  icon: ReactNode;
  className?: string;
  children: ReactNode;
}

const SecurityCard = ({ title, icon, className = '', children }: SecurityCardProps) => {
  return (
    <Card className={`relative overflow-hidden border border-gray-200 dark:border-gray-800 ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-security-secondary">{icon}</div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default SecurityCard;
