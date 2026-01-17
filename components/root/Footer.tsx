import { APP_NAME } from "@/lib/utils";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Biohazard,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { href: "https://facebook.com", Icon: Facebook, label: "Facebook" },
    { href: "https://x.com", Icon: Twitter, label: "Twitter" },
    { href: "https://instagram.com", Icon: Instagram, label: "Instagram" },
    { href: "https://linkedin.com", Icon: Linkedin, label: "LinkedIn" },
  ];

  const companyLinks = [
    { href: "/#features", label: "About" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms-of-service", label: "Terms of Service" },
    { href: "/affiliate", label: "Affiliate Program" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <footer className="bg-[#12141C] pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4 inline-flex gap-2 items-center">
              {APP_NAME}
              <Biohazard className="size-7 text-crypto-purple" />
            </h2>
            <p className="text-gray-400 mb-6 max-w-xs">
              The most trusted stock and crypto trading platform, empowering
              traders with innovative AI powered tools and unparalleled
              security.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  className="text-gray-400 hover:text-crypto-purple transition-colors"
                >
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">{label}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map(({ href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-gray-400 hover:text-crypto-purple transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {currentYear} {APP_NAME} Inc. All rights reserved.
            </p>
            {/* <div className="flex space-x-6">
              {legalLinks.map(({ href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="text-gray-400 hover:text-crypto-purple text-sm transition-colors"
                >
                  {label}
                </a>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
