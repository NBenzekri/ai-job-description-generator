"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { UserCircle, Menu, X, ChevronDown } from "lucide-react";

export function Nav() {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignInOut = () => {
    if (session) {
      signOut({ callbackUrl: "/", redirect: true });
    } else {
      signIn("google");
    }
    closeMobileMenu();
  };

  return (
    <header className="w-full py-4 px-4 sm:px-6 lg:px-8 bg-white border-b">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          AI Job Description Generator
        </Link>
        <nav className="hidden md:flex space-x-4 items-center">
          <Link
            href="/generate-job-description"
            className="text-gray-600 hover:text-blue-600"
          >
            Job Descriptions
          </Link>
          <Link
            href="/generate-linkedin-message"
            className="text-gray-600 hover:text-blue-600"
          >
            LinkedIn Messages
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-blue-600">
            Contact
          </Link>
          {session ? (
            <div className="relative">
              <Button
                onClick={toggleDropdown}
                variant="outline"
                className="flex items-center gap-2"
              >
                <UserCircle className="w-5 h-5" />
                <span>Hello, {session.user.name}</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-gray-600 hover:text-blue-600"
                    onClick={toggleDropdown}
                  >
                    <UserCircle className="w-5 h-5 inline-block mr-2" />
                    Dashboard
                  </Link>
                  <Button
                    onClick={handleSignInOut}
                    variant="outline"
                    className="w-full text-left px-4 py-2"
                  >
                    Sign Out
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <Button onClick={handleSignInOut} variant="outline">
              Sign In
            </Button>
          )}
        </nav>
        <Button
          className="md:hidden"
          variant="outline"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 space-y-4">
          <Link
            href="/generate-job-description"
            className="block text-gray-600 hover:text-blue-600"
            onClick={closeMobileMenu}
          >
            Job Descriptions
          </Link>
          <Link
            href="/generate-linkedin-message"
            className="block text-gray-600 hover:text-blue-600"
            onClick={closeMobileMenu}
          >
            LinkedIn Messages
          </Link>
          <Link
            href="/contact"
            className="block text-gray-600 hover:text-blue-600"
            onClick={closeMobileMenu}
          >
            Contact
          </Link>
          {session ? (
            <>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                onClick={closeMobileMenu}
              >
                <UserCircle className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
              <Button
                onClick={handleSignInOut}
                variant="outline"
                className="w-full"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Button
              onClick={handleSignInOut}
              variant="outline"
              className="w-full"
            >
              Sign In
            </Button>
          )}
        </div>
      )}
    </header>
  );
}
