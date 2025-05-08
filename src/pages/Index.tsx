
import Layout from "@/components/layout/Layout";
import SecurityCard from "@/components/dashboard/SecurityCard";
import StatusCard from "@/components/dashboard/StatusCard";
import VulnerabilityChart from "@/components/dashboard/VulnerabilityChart";
import RecentScans from "@/components/dashboard/RecentScans";
import ScanTimeline from "@/components/dashboard/ScanTimeline";
import { mockVulnerabilityData, mockTimelineData, mockRecentScans } from "@/data/mockData";
import { Shield, Bug, Network, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <Layout>
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Security Dashboard</h1>
          <p className="text-muted-foreground">Monitor and manage your application security posture</p>
        </div>
        <Button className="mt-4 sm:mt-0 bg-security-primary hover:bg-security-secondary text-white">
          <Shield className="mr-2 h-4 w-4" /> Run Comprehensive Scan
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatusCard 
          title="Total Vulnerabilities" 
          value="257" 
          icon={<Bug className="h-5 w-5 text-security-high" />} 
          trend={{ value: 12, isPositive: true }}
          className="bg-white dark:bg-security-card"
        />
        <StatusCard 
          title="Critical Issues" 
          value="12" 
          icon={<Shield className="h-5 w-5 text-security-critical" />} 
          trend={{ value: 3, isPositive: false }}
          className="bg-white dark:bg-security-card"
        />
        <StatusCard 
          title="Protected Repositories" 
          value="5/7" 
          icon={<Network className="h-5 w-5 text-security-primary" />}
          className="bg-white dark:bg-security-card"
        />
        <StatusCard 
          title="Scanned Containers" 
          value="16" 
          icon={<Package className="h-5 w-5 text-security-secondary" />}
          trend={{ value: 5, isPositive: true }}
          className="bg-white dark:bg-security-card"
        />
      </div>

      <div className="grid gap-4 mt-8 md:grid-cols-2">
        <SecurityCard title="Vulnerability Breakdown" icon={<Bug />} className="bg-white dark:bg-security-card">
          <VulnerabilityChart data={mockVulnerabilityData} />
        </SecurityCard>
        <SecurityCard title="Vulnerabilities Over Time" icon={<Network />} className="bg-white dark:bg-security-card">
          <ScanTimeline data={mockTimelineData} />
        </SecurityCard>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Recent Scans</h2>
        <RecentScans scans={mockRecentScans} />
      </div>
    </Layout>
  );
};

export default Index;
