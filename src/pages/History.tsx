
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, Calendar } from "lucide-react";
import ScanTimeline from "@/components/dashboard/ScanTimeline";
import { format, subDays } from "date-fns";

// Mock data
const createMockScanHistory = () => {
  const scans = [];
  for (let i = 0; i < 12; i++) {
    const date = subDays(new Date(), i * 5);
    const vulnerabilities = Math.floor(200 + Math.random() * 100 - i * 8);
    
    scans.push({
      id: `scan-${i}`,
      date: format(date, "MMM dd"),
      fullDate: date,
      repository: ["frontend-app", "backend-api", "auth-service", "payment-processor", "data-pipeline"][i % 5],
      status: i % 3 === 0 ? "failed" : "passed",
      scannerUsed: i % 2 === 0 ? "SonarQube, Trivy" : "SonarQube",
      vulnerabilities,
      critical: Math.floor(vulnerabilities * 0.05),
      high: Math.floor(vulnerabilities * 0.15),
      medium: Math.floor(vulnerabilities * 0.3),
      low: Math.floor(vulnerabilities * 0.5),
    });
  }
  return scans;
};

const mockScanHistory = createMockScanHistory();

const mockChartData = mockScanHistory.slice(0, 8).map(scan => ({
  date: scan.date,
  vulnerabilities: scan.vulnerabilities
})).reverse();

const History = () => {
  const [selectedRepository, setSelectedRepository] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("60days");
  
  // Filter history based on selected repository
  const filteredHistory = mockScanHistory.filter(scan => 
    selectedRepository === "all" || scan.repository === selectedRepository
  );

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Scan History</h1>
        <p className="text-muted-foreground">Track security scan results over time</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center">
              <div>
                <CardTitle>Vulnerability Trend</CardTitle>
                <CardDescription>Historical view of vulnerabilities over time</CardDescription>
              </div>
              <div className="flex gap-2 mt-4 sm:mt-0">
                <Select value={selectedRepository} onValueChange={setSelectedRepository}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Repository" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Repositories</SelectItem>
                    <SelectItem value="frontend-app">Frontend App</SelectItem>
                    <SelectItem value="backend-api">Backend API</SelectItem>
                    <SelectItem value="auth-service">Auth Service</SelectItem>
                    <SelectItem value="payment-processor">Payment Processor</SelectItem>
                    <SelectItem value="data-pipeline">Data Pipeline</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Time Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30days">Last 30 Days</SelectItem>
                    <SelectItem value="60days">Last 60 Days</SelectItem>
                    <SelectItem value="90days">Last 90 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ScanTimeline data={mockChartData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Scan History</CardTitle>
            <CardDescription>Detailed history of all security scans</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Repository</TableHead>
                    <TableHead>Scanners Used</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Critical</TableHead>
                    <TableHead>High</TableHead>
                    <TableHead>Medium</TableHead>
                    <TableHead>Low</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredHistory.map((scan) => (
                    <TableRow key={scan.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{format(scan.fullDate, "MMM dd, yyyy")}</span>
                        </div>
                      </TableCell>
                      <TableCell>{scan.repository}</TableCell>
                      <TableCell>{scan.scannerUsed}</TableCell>
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
                      <TableCell>
                        <Badge className="bg-security-critical text-white">{scan.critical}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-security-high text-white">{scan.high}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-security-medium text-security-background">{scan.medium}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-security-low text-security-background">{scan.low}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="mr-2">
                          <Shield className="h-4 w-4 mr-1" /> View Report
                        </Button>
                        <Button variant="outline" size="sm">
                          <AlertTriangle className="h-4 w-4 mr-1" /> Compare
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default History;
