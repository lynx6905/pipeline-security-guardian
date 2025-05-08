
import { Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-security-background text-security-foreground border-t border-security-muted mt-auto">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4 md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start space-x-6">
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-security-secondary mr-2" />
              <span className="text-sm">Pipeline Security Guardian</span>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-center md:text-right text-xs">
              © {new Date().getFullYear()} Pipeline Security Guardian. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
