
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, Bug, Server, Search } from "lucide-react";

const mockVulnerabilities = [
  {
    id: "CVE-2023-1234",
    severity: "Critical",
    title: "Remote Code Execution in Express",
    component: "express@4.17.1",
    location: "package.json",
    scanner: "SonarQube",
    description: "A remote code execution vulnerability in Express.js that allows attackers to execute arbitrary code.",
    remediation: "Update to express@4.17.3 or newer"
  },
  {
    id: "CVE-2023-5678",
    severity: "High",
    title: "SQL Injection in API Endpoint",
    component: "src/controllers/user.js",
    location: "src/controllers/user.js:45",
    scanner: "SonarQube",
    description: "Possible SQL injection in user controller where user input is directly concatenated into SQL query.",
    remediation: "Use parameterized queries or prepared statements"
  },
  {
    id: "CVE-2023-9012",
    severity: "Medium",
    title: "Insecure Deserialization",
    component: "lodash@4.17.15",
    location: "package.json",
    scanner: "Trivy",
    description: "Insecure deserialization in lodash allows attackers to execute arbitrary code via crafted payload.",
    remediation: "Update to lodash@4.17.21 or newer"
  },
  {
    id: "CVE-2023-3456",
    severity: "Medium",
    title: "Information Disclosure",
    component: "src/routes/admin.js",
    location: "src/routes/admin.js:23",
    scanner: "SonarQube",
    description: "Potentially sensitive information is exposed through error messages or API responses.",
    remediation: "Filter sensitive information from error messages and responses"
  },
  {
    id: "CVE-2023-7890",
    severity: "Low",
    title: "Outdated TLS Configuration",
    component: "nginx:1.18.0",
    location: "Dockerfile",
    scanner: "Trivy",
    description: "The TLS configuration is outdated and uses deprecated cipher suites.",
    remediation: "Update TLS configuration to use modern cipher suites"
  },
  {
    id: "CVE-2023-2345",
    severity: "High",
    title: "Path Traversal Vulnerability",
    component: "src/utils/fileManager.js",
    location: "src/utils/fileManager.js:78",
    scanner: "SonarQube",
    description: "Path traversal vulnerability that could allow attackers to access files outside of the intended directory.",
    remediation: "Validate and sanitize file paths before accessing the filesystem"
  },
  {
    id: "CVE-2023-6789",
    severity: "Low",
    title: "Missing Content Security Policy",
    component: "app.js",
    location: "app.js:12",
    scanner: "SonarQube",
    description: "No Content Security Policy (CSP) is specified, which may expose the application to XSS attacks.",
    remediation: "Implement a Content Security Policy header"
  },
  {
    id: "CVE-2023-8901",
    severity: "Critical",
    title: "Container with Root Privileges",
    component: "node:14-alpine",
    location: "Dockerfile",
    scanner: "Trivy",
    description: "Container runs as root, which could lead to host system compromise if container is breached.",
    remediation: "Use non-root user in Dockerfile with USER directive"
  }
];

const ScanResults = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [scannerFilter, setScannerFilter] = useState("all");
  
  const filteredVulnerabilities = mockVulnerabilities.filter(vuln => {
    const matchesSearch = 
      vuln.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vuln.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vuln.component.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSeverity = severityFilter === "all" || vuln.severity.toLowerCase() === severityFilter.toLowerCase();
    
    const matchesScanner = scannerFilter === "all" || vuln.scanner.toLowerCase() === scannerFilter.toLowerCase();
    
    return matchesSearch && matchesSeverity && matchesScanner;
  });
  
  const getSeverityBadgeClass = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return 'bg-security-critical text-white';
      case 'high':
        return 'bg-security-high text-white';
      case 'medium':
        return 'bg-security-medium text-security-background';
      case 'low':
        return 'bg-security-low text-security-background';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <Layout>
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Scan Results</h1>
          <p className="text-muted-foreground">Review and manage identified security vulnerabilities</p>
        </div>
        <Button className="mt-4 sm:mt-0 bg-security-primary hover:bg-security-secondary text-white">
          <Search className="mr-2 h-4 w-4" /> Export Results
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vulnerability Analysis</CardTitle>
          <CardDescription>Detailed breakdown of security issues found in your code and containers</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="vulnerabilities" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="vulnerabilities">All Vulnerabilities</TabsTrigger>
              <TabsTrigger value="code">Code Issues</TabsTrigger>
              <TabsTrigger value="dependencies">Dependency Issues</TabsTrigger>
              <TabsTrigger value="containers">Container Issues</TabsTrigger>
            </TabsList>
            
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="w-full md:w-1/3">
                <Label htmlFor="search" className="sr-only">Search</Label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search vulnerabilities..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="w-full md:w-1/3">
                <Label htmlFor="severity" className="sr-only">Severity</Label>
                <Select value={severityFilter} onValueChange={setSeverityFilter}>
                  <SelectTrigger id="severity">
                    <SelectValue placeholder="Filter by severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severities</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full md:w-1/3">
                <Label htmlFor="scanner" className="sr-only">Scanner</Label>
                <Select value={scannerFilter} onValueChange={setScannerFilter}>
                  <SelectTrigger id="scanner">
                    <SelectValue placeholder="Filter by scanner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Scanners</SelectItem>
                    <SelectItem value="sonarqube">SonarQube</SelectItem>
                    <SelectItem value="trivy">Trivy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <TabsContent value="vulnerabilities" className="mt-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead className="w-[100px]">Severity</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Component</TableHead>
                      <TableHead>Scanner</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredVulnerabilities.length > 0 ? (
                      filteredVulnerabilities.map((vuln) => (
                        <TableRow key={vuln.id}>
                          <TableCell className="font-mono text-xs">{vuln.id}</TableCell>
                          <TableCell>
                            <Badge className={getSeverityBadgeClass(vuln.severity)}>
                              {vuln.severity}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">{vuln.title}</TableCell>
                          <TableCell className="text-sm">{vuln.component}</TableCell>
                          <TableCell>{vuln.scanner}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm" className="mr-2">
                              <Shield className="h-4 w-4 mr-1" /> View
                            </Button>
                            <Button variant="outline" size="sm">
                              <Bug className="h-4 w-4 mr-1" /> Fix
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                          No vulnerabilities match your filters
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="code" className="mt-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead className="w-[100px]">Severity</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredVulnerabilities
                      .filter(v => !v.component.includes('@') && !v.component.includes(':'))
                      .map((vuln) => (
                        <TableRow key={vuln.id}>
                          <TableCell className="font-mono text-xs">{vuln.id}</TableCell>
                          <TableCell>
                            <Badge className={getSeverityBadgeClass(vuln.severity)}>
                              {vuln.severity}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">{vuln.title}</TableCell>
                          <TableCell className="font-mono text-xs">{vuln.location}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm" className="mr-2">
                              <Shield className="h-4 w-4 mr-1" /> View
                            </Button>
                            <Button variant="outline" size="sm">
                              <Bug className="h-4 w-4 mr-1" /> Fix
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="dependencies" className="mt-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead className="w-[100px]">Severity</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Package</TableHead>
                      <TableHead>Remediation</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredVulnerabilities
                      .filter(v => v.component.includes('@'))
                      .map((vuln) => (
                        <TableRow key={vuln.id}>
                          <TableCell className="font-mono text-xs">{vuln.id}</TableCell>
                          <TableCell>
                            <Badge className={getSeverityBadgeClass(vuln.severity)}>
                              {vuln.severity}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">{vuln.title}</TableCell>
                          <TableCell className="font-mono text-xs">{vuln.component}</TableCell>
                          <TableCell>{vuln.remediation}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">
                              <Shield className="h-4 w-4 mr-1" /> Fix
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="containers" className="mt-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead className="w-[100px]">Severity</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Image</TableHead>
                      <TableHead>Remediation</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredVulnerabilities
                      .filter(v => v.component.includes(':') && !v.component.includes('@'))
                      .map((vuln) => (
                        <TableRow key={vuln.id}>
                          <TableCell className="font-mono text-xs">{vuln.id}</TableCell>
                          <TableCell>
                            <Badge className={getSeverityBadgeClass(vuln.severity)}>
                              {vuln.severity}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">{vuln.title}</TableCell>
                          <TableCell className="font-mono text-xs">{vuln.component}</TableCell>
                          <TableCell>{vuln.remediation}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm" className="mr-2">
                              <Server className="h-4 w-4 mr-1" /> View
                            </Button>
                            <Button variant="outline" size="sm">
                              <Shield className="h-4 w-4 mr-1" /> Fix
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default ScanResults;
