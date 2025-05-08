
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDistanceToNow } from 'date-fns';
import { Badge } from "@/components/ui/badge";

interface Scan {
  id: string;
  repository: string;
  timestamp: Date;
  status: 'passed' | 'failed';
  issues: number;
}

interface RecentScansProps {
  scans: Scan[];
}

const RecentScans = ({ scans }: RecentScansProps) => {
  return (
    <div className="rounded-md border border-gray-200 dark:border-gray-800">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Repository</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Issues</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scans.map((scan) => (
            <TableRow key={scan.id}>
              <TableCell className="font-medium">{scan.repository}</TableCell>
              <TableCell>{formatDistanceToNow(scan.timestamp, { addSuffix: true })}</TableCell>
              <TableCell>
                <Badge 
                  variant={scan.status === 'passed' ? 'outline' : 'destructive'}
                  className={scan.status === 'passed' 
                    ? 'border-security-low text-security-low'
                    : 'bg-security-high text-white border-security-high'
                  }
                >
                  {scan.status === 'passed' ? 'PASSED' : 'FAILED'}
                </Badge>
              </TableCell>
              <TableCell className="text-right">{scan.issues}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentScans;
