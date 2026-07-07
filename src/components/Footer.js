"use client";

import Link from "next/link";
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaGithub } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaTwitter, href: "https://twitter.com/aiforge", label: "Twitter" },
    { icon: FaFacebook, href: "https://facebook.com/aiforge", label: "Facebook" },
    { icon: FaInstagram, href: "https://instagram.com/aiforge", label: "Instagram" },
    { icon: FaLinkedin, href: "https://linkedin.com/company/aiforge", label: "LinkedIn" },
    { icon: FaYoutube, href: "https://youtube.com/aiforge", label: "YouTube" },
    { icon: FaGithub, href: "https://github.com/aiforge", label: "GitHub" },
  ];

  return (
    <footer className="w-full border-t border-divider/40 bg-bg-page py-8 text-xs text-secondary-text mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
          {/* Top Section */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              &copy; {currentYear} AIForge. جميع الحقوق محفوظة.
            </div>
            <div className="flex gap-4">
              <Link href="/terms" className="hover:text-primary-text transition-colors">
                شروط الاستخدام
              </Link>
              <span className="opacity-30">•</span>
              <Link href="/privacy" className="hover:text-primary-text transition-colors">
                سياسة الخصوصية
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 py-4 border-t border-divider/20">
            <span className="text-xs">تابعنا على:</span>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-primary/20 text-primary-text hover:text-primary transition-all group"
                    title={social.label}
                  >
                    <Icon size={18} className="group-hover:scale-110 transition-transform" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
