
export const mockVulnerabilityData = [
  { name: "Critical", value: 12, color: "#991b1b" },
  { name: "High", value: 32, color: "#ef4444" },
  { name: "Medium", value: 68, color: "#f59e0b" },
  { name: "Low", value: 145, color: "#22c55e" },
];

export const mockTimelineData = [
  { date: "Jan 01", vulnerabilities: 210 },
  { date: "Jan 15", vulnerabilities: 245 },
  { date: "Feb 01", vulnerabilities: 187 },
  { date: "Feb 15", vulnerabilities: 142 },
  { date: "Mar 01", vulnerabilities: 158 },
  { date: "Mar 15", vulnerabilities: 124 },
  { date: "Apr 01", vulnerabilities: 98 },
  { date: "Apr 15", vulnerabilities: 114 },
];

export const mockRecentScans = [
  {
    id: "1",
    repository: "frontend-app",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
    status: "failed" as const,
    issues: 12,
  },
  {
    id: "2",
    repository: "backend-api",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    status: "passed" as const,
    issues: 0,
  },
  {
    id: "3",
    repository: "auth-service",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    status: "passed" as const,
    issues: 2,
  },
  {
    id: "4",
    repository: "payment-processor",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    status: "failed" as const,
    issues: 8,
  },
  {
    id: "5",
    repository: "data-pipeline",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 24 hours ago
    status: "passed" as const,
    issues: 1,
  },
];

export const mockScanTools = [
  { 
    id: "sonarqube",
    name: "SonarQube", 
    description: "Code quality and security scanner",
    status: "connected",
    lastScan: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    icon: "code"
  },
  { 
    id: "trivy",
    name: "Trivy", 
    description: "Container vulnerability scanner",
    status: "connected",
    lastScan: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    icon: "package"
  },
  { 
    id: "dependency-check",
    name: "OWASP Dependency-Check", 
    description: "Software composition analysis tool",
    status: "disconnected",
    lastScan: null,
    icon: "list"
  }
];

export const mockRepositories = [
  {
    id: "repo1",
    name: "frontend-app",
    url: "https://github.com/company/frontend-app",
    language: "TypeScript",
    scanEnabled: true,
    scanFrequency: "daily"
  },
  {
    id: "repo2",
    name: "backend-api",
    url: "https://github.com/company/backend-api",
    language: "Java",
    scanEnabled: true,
    scanFrequency: "daily"
  },
  {
    id: "repo3",
    name: "auth-service",
    url: "https://github.com/company/auth-service",
    language: "Go",
    scanEnabled: true,
    scanFrequency: "weekly"
  },
  {
    id: "repo4",
    name: "payment-processor",
    url: "https://github.com/company/payment-processor",
    language: "Python",
    scanEnabled: false,
    scanFrequency: "manual"
  },
  {
    id: "repo5",
    name: "data-pipeline",
    url: "https://github.com/company/data-pipeline",
    language: "Scala",
    scanEnabled: true,
    scanFrequency: "daily"
  }
];
