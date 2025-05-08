
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockScanTools, mockRepositories } from "@/data/mockData";
import { Code, Package, List, Shield, Settings } from "lucide-react";

const Configuration = () => {
  const [sonarQubeUrl, setSonarQubeUrl] = useState("http://sonarqube:9000");
  const [sonarQubeToken, setSonarQubeToken] = useState("••••••••••••••••");
  const [trivyPath, setTrivyPath] = useState("/usr/local/bin/trivy");
  
  const renderToolIcon = (iconName: string) => {
    switch (iconName) {
      case 'code':
        return <Code className="h-5 w-5" />;
      case 'package':
        return <Package className="h-5 w-5" />;
      case 'list':
        return <List className="h-5 w-5" />;
      default:
        return <Shield className="h-5 w-5" />;
    }
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Configuration</h1>
        <p className="text-muted-foreground">Configure your security tools and integration settings</p>
      </div>

      <Tabs defaultValue="scanners" className="w-full">
        <TabsList>
          <TabsTrigger value="scanners">Security Scanners</TabsTrigger>
          <TabsTrigger value="repositories">Repositories</TabsTrigger>
          <TabsTrigger value="pipeline">Pipeline Integration</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="scanners">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>SonarQube Configuration</CardTitle>
                <CardDescription>Configure your SonarQube connection for code quality and security analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sonarqube-url">SonarQube URL</Label>
                      <Input 
                        id="sonarqube-url" 
                        placeholder="http://sonarqube:9000" 
                        value={sonarQubeUrl} 
                        onChange={(e) => setSonarQubeUrl(e.target.value)} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sonarqube-token">API Token</Label>
                      <Input 
                        id="sonarqube-token" 
                        type="password" 
                        placeholder="Enter your SonarQube API token" 
                        value={sonarQubeToken} 
                        onChange={(e) => setSonarQubeToken(e.target.value)} 
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 pt-4">
                    <Switch id="sonarqube-enabled" defaultChecked />
                    <Label htmlFor="sonarqube-enabled">Enable SonarQube scanning</Label>
                  </div>
                  <div className="pt-4">
                    <Button className="bg-security-primary hover:bg-security-secondary text-white">Save SonarQube Settings</Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Trivy Configuration</CardTitle>
                <CardDescription>Configure Trivy for container image and filesystem scanning</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="trivy-path">Trivy Path</Label>
                      <Input 
                        id="trivy-path" 
                        placeholder="/usr/local/bin/trivy" 
                        value={trivyPath} 
                        onChange={(e) => setTrivyPath(e.target.value)} 
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 pt-4">
                    <Switch id="trivy-enabled" defaultChecked />
                    <Label htmlFor="trivy-enabled">Enable Trivy scanning</Label>
                  </div>
                  <div className="pt-4">
                    <Button className="bg-security-primary hover:bg-security-secondary text-white">Save Trivy Settings</Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Available Security Tools</CardTitle>
                <CardDescription>Manage your security scanning tools</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12"></TableHead>
                      <TableHead>Tool</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Scan</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockScanTools.map((tool) => (
                      <TableRow key={tool.id}>
                        <TableCell>
                          <div className="p-2 rounded-full bg-security-secondary bg-opacity-10">
                            {renderToolIcon(tool.icon)}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{tool.name}</TableCell>
                        <TableCell>{tool.description}</TableCell>
                        <TableCell>
                          <span 
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              tool.status === 'connected' 
                                ? 'bg-security-low bg-opacity-20 text-security-low' 
                                : 'bg-security-high bg-opacity-20 text-security-high'
                            }`}
                          >
                            {tool.status === 'connected' ? 'Connected' : 'Disconnected'}
                          </span>
                        </TableCell>
                        <TableCell>{tool.lastScan ? new Date(tool.lastScan).toLocaleString() : 'Never'}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4 mr-1" /> Configure
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="repositories">
          <Card>
            <CardHeader>
              <CardTitle>Repository Configuration</CardTitle>
              <CardDescription>Manage repositories for security scanning</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Repository</TableHead>
                    <TableHead>Language</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Scan Frequency</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockRepositories.map((repo) => (
                    <TableRow key={repo.id}>
                      <TableCell className="font-medium">{repo.name}</TableCell>
                      <TableCell>{repo.language}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{repo.url}</TableCell>
                      <TableCell>
                        <Select defaultValue={repo.scanFrequency}>
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hourly">Hourly</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="manual">Manual</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Switch id={`repo-enabled-${repo.id}`} defaultChecked={repo.scanEnabled} />
                          <Label htmlFor={`repo-enabled-${repo.id}`} className="ml-2">
                            {repo.scanEnabled ? 'Enabled' : 'Disabled'}
                          </Label>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="mr-2">
                          <Shield className="h-4 w-4 mr-1" /> Scan Now
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-1" /> Configure
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4">
                <Button className="bg-security-primary hover:bg-security-secondary text-white">
                  Add Repository
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pipeline">
          <Card>
            <CardHeader>
              <CardTitle>CI/CD Pipeline Integration</CardTitle>
              <CardDescription>Configure integration with your CI/CD pipelines</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Pipeline Type</Label>
                    <Select defaultValue="github">
                      <SelectTrigger>
                        <SelectValue placeholder="Select pipeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="github">GitHub Actions</SelectItem>
                        <SelectItem value="gitlab">GitLab CI</SelectItem>
                        <SelectItem value="jenkins">Jenkins</SelectItem>
                        <SelectItem value="azure">Azure DevOps</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Integration Mode</Label>
                    <Select defaultValue="blocking">
                      <SelectTrigger>
                        <SelectValue placeholder="Select mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="blocking">Blocking (Fail on High+)</SelectItem>
                        <SelectItem value="non-blocking">Non-Blocking (Report Only)</SelectItem>
                        <SelectItem value="strict">Strict (Fail on Any)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <div className="flex">
                    <Input
                      id="webhook-url"
                      readOnly
                      value="https://security-guardian.example.com/api/webhooks/pipeline/12345"
                      className="flex-1 rounded-r-none"
                    />
                    <Button variant="outline" className="rounded-l-none">
                      Copy
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Use this webhook URL in your CI/CD pipeline to trigger security scans and receive results.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Pipeline Configuration Examples</Label>
                  <div className="bg-slate-950 text-slate-50 p-4 rounded-md overflow-x-auto">
                    <pre className="text-sm">
                      {`# GitHub Actions Example
name: Security Scan

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Run Security Scan
        uses: security-guardian/scan-action@v1
        with:
          token: \${{ secrets.SECURITY_TOKEN }}
          webhook-url: "https://security-guardian.example.com/api/webhooks/pipeline/12345"
          scan-type: "full"
          
      - name: Upload Results
        if: always()
        uses: security-guardian/upload-results@v1
        with:
          token: \${{ secrets.SECURITY_TOKEN }}`}
                    </pre>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="fail-build" defaultChecked />
                    <Label htmlFor="fail-build">Fail build on critical vulnerabilities</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="auto-create-issues" defaultChecked />
                    <Label htmlFor="auto-create-issues">Automatically create issues for vulnerabilities</Label>
                  </div>
                </div>

                <Button className="bg-security-primary hover:bg-security-secondary text-white">
                  Save Pipeline Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure alerts and notifications for security events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Notifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email-recipients">Recipients</Label>
                      <Input 
                        id="email-recipients" 
                        placeholder="security@example.com, admin@example.com" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Notification Level</Label>
                      <Select defaultValue="high">
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="critical">Critical Only</SelectItem>
                          <SelectItem value="high">High and Above</SelectItem>
                          <SelectItem value="medium">Medium and Above</SelectItem>
                          <SelectItem value="all">All Vulnerabilities</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="email-enabled" defaultChecked />
                    <Label htmlFor="email-enabled">Enable email notifications</Label>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Slack Integration</h3>
                  <div className="space-y-2">
                    <Label htmlFor="slack-webhook">Webhook URL</Label>
                    <Input id="slack-webhook" placeholder="https://hooks.slack.com/services/..." />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="slack-channel">Channel</Label>
                      <Input id="slack-channel" placeholder="#security-alerts" />
                    </div>
                    <div className="space-y-2">
                      <Label>Notification Level</Label>
                      <Select defaultValue="high">
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="critical">Critical Only</SelectItem>
                          <SelectItem value="high">High and Above</SelectItem>
                          <SelectItem value="medium">Medium and Above</SelectItem>
                          <SelectItem value="all">All Vulnerabilities</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="slack-enabled" defaultChecked />
                    <Label htmlFor="slack-enabled">Enable Slack notifications</Label>
                  </div>
                </div>

                <Button className="bg-security-primary hover:bg-security-secondary text-white">
                  Save Notification Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Configuration;
