import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-t">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-xl font-bold mb-4">PrimePass 🎟️</h3>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Elevating your event experience with gamified ticket booking and rewards.
            </p>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li className="group relative">
                <Link 
                  href="/events" 
                  className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary transition-colors group-hover:text-primary"
                >
                  <span className="relative">
                    Events
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
              </li>
              <li className="group relative">
                <Link 
                  href="/events?category=movies" 
                  className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary transition-colors group-hover:text-primary"
                >
                  <span className="relative">
                    Movies
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
              </li>
              <li className="group relative">
                <Link 
                  href="/events?category=sports" 
                  className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary transition-colors group-hover:text-primary"
                >
                  <span className="relative">
                    Sports
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
              </li>
              <li className="group relative">
                <Link 
                  href="/rewards" 
                  className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary transition-colors group-hover:text-primary"
                >
                  <span className="relative">
                    Rewards
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
              </li>
              <li className="group relative">
                <Link 
                  href="/about" 
                  className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary transition-colors group-hover:text-primary"
                >
                  <span className="relative">
                    About Us
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <div className="group relative">
                  <Link 
                    href="/support/help" 
                    className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary transition-colors group-hover:text-primary"
                  >
                    <span className="relative">
                      Help Center
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Link>
                </div>
              </li>
              <li>
                <div className="group relative">
                  <Link 
                    href="/support/faq" 
                    className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary transition-colors group-hover:text-primary"
                  >
                    <span className="relative">
                      FAQs
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Link>
                </div>
              </li>
              <li>
                <div className="group relative">
                  <Link 
                    href="/legal/privacy" 
                    className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary transition-colors group-hover:text-primary"
                  >
                    <span className="relative">
                      Privacy Policy
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Link>
                </div>
              </li>
              <li>
                <div className="group relative">
                  <Link 
                    href="/legal/terms" 
                    className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary transition-colors group-hover:text-primary"
                  >
                    <span className="relative">
                      Terms of Service
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Link>
                </div>
              </li>
              <li>
                <div className="group relative">
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary transition-colors group-hover:text-primary"
                  >
                    <span className="relative">
                      Contact Us
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Link>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex">
                <MapPin className="w-5 h-5 mr-2 text-primary shrink-0" />
                <span className="text-gray-600 dark:text-gray-400">Hubli-Dharwad , Karnataka, India</span>
              </li>
              <li className="flex">
                <Phone className="w-5 h-5 mr-2 text-primary shrink-0" />
                <span className="text-gray-600 dark:text-gray-400">+91 1234567890</span>
              </li>
              <li className="flex">
                <Mail className="w-5 h-5 mr-2 text-primary shrink-0" />
                <span className="text-gray-600 dark:text-gray-400">support@primepass.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-gray-600 dark:text-gray-400">© 2025 PrimePass. All rights reserved.</p>
            <div className="flex space-x-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="group relative">
                <Link 
                  href="/privacy" 
                  className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary transition-colors group-hover:text-primary"
                >
                  <span className="relative">
                    Privacy
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
              </div>
              <div className="group relative">
                <Link 
                  href="/terms" 
                  className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary transition-colors group-hover:text-primary"
                >
                  <span className="relative">
                    Terms
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
              </div>
              <div className="group relative">
                <Link 
                  href="/cookies" 
                  className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary transition-colors group-hover:text-primary"
                >
                  <span className="relative">
                    Cookies
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
