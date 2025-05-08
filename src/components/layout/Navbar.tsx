
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Settings, Terminal, Bug, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-security-background text-security-foreground border-b border-security-muted">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Shield className="h-8 w-8 text-security-secondary mr-2" />
              <span className="font-bold text-xl">Pipeline Security Guardian</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-security-foreground hover:bg-security-muted">Dashboard</Link>
                <Link to="/scan-results" className="px-3 py-2 rounded-md text-sm font-medium text-security-foreground hover:bg-security-muted">Scan Results</Link>
                <Link to="/configuration" className="px-3 py-2 rounded-md text-sm font-medium text-security-foreground hover:bg-security-muted">Configuration</Link>
                <Link to="/history" className="px-3 py-2 rounded-md text-sm font-medium text-security-foreground hover:bg-security-muted">History</Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <Button variant="outline" className="border-security-primary text-security-primary hover:bg-security-primary hover:text-security-foreground">
              <Search className="h-4 w-4 mr-2" />
              Quick Scan
            </Button>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-security-foreground hover:text-white hover:bg-security-muted focus:outline-none"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-security-foreground hover:bg-security-muted">Dashboard</Link>
            <Link to="/scan-results" className="block px-3 py-2 rounded-md text-base font-medium text-security-foreground hover:bg-security-muted">Scan Results</Link>
            <Link to="/configuration" className="block px-3 py-2 rounded-md text-base font-medium text-security-foreground hover:bg-security-muted">Configuration</Link>
            <Link to="/history" className="block px-3 py-2 rounded-md text-base font-medium text-security-foreground hover:bg-security-muted">History</Link>
            <Button variant="outline" className="w-full mt-3 border-security-primary text-security-primary hover:bg-security-primary hover:text-security-foreground">
              <Search className="h-4 w-4 mr-2" />
              Quick Scan
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
