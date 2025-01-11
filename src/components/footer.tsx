import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-6 bg-gray-100 rounded-t-lg">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            © {currentYear} AI Job Description Generator. All rights reserved.
          </p>
          <nav className="flex gap-4">
            <Link
              className="text-sm hover:underline underline-offset-4"
              href="#"
            >
              Terms of Service
            </Link>
            <Link
              className="text-sm hover:underline underline-offset-4"
              href="#"
            >
              Privacy Policy
            </Link>
            <Link
              className="text-sm hover:underline underline-offset-4"
              href="/contact"
            >
              Contact
            </Link>
          </nav>
        </div>
        <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
          Made with love ❤️ by{" "}
          <Link
            className="hover:underline underline-offset-4"
            href="https://github.com/NBenzekri"
            target="_blank"
            rel="noopener noreferrer"
          >
            NBenzekri
          </Link>
        </div>
      </div>
    </footer>
  );
}
