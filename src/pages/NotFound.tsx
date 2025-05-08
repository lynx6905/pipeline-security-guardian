
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Shield, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-security-background text-security-foreground">
      <div className="text-center px-4">
        <div className="mb-6 inline-flex items-center justify-center p-4 bg-security-muted rounded-full">
          <Shield className="h-12 w-12 text-security-secondary" />
        </div>
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-security-foreground mb-8">Oops! The security scan couldn't locate this page.</p>
        <Button asChild className="bg-security-primary hover:bg-security-secondary">
          <Link to="/" className="inline-flex items-center">
            <Home className="mr-2 h-4 w-4" /> Return to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
