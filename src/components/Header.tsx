import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X, Phone, Mail, Sparkles } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Menu', href: '/menu' },
    { name: 'Packages', href: '/packages' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar with Maharashtra Focus */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 text-white py-2 animate-pulse-slow">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-sm space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 animate-bounce-subtle">
              <Phone className="h-4 w-4" />
              <span className="font-medium">+91 9057264895</span>
            </div>
            <div className="flex items-center space-x-1 hidden sm:flex">
              <Mail className="h-4 w-4" />
              <span>info@bhagwaticaterer.in</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-orange-700 bg-opacity-50 px-3 py-1 rounded-full">
            <Sparkles className="h-4 w-4 text-yellow-300 animate-pulse" />
            <span className="font-bold">शुद्ध शाकाहारी भोजन - महाराष्ट्रातील आपल्या सेवा</span>
            <Sparkles className="h-4 w-4 text-yellow-300 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo with Regional Touch */}
          <Link href="/" className="flex items-center text-2xl font-bold text-orange-600 transform transition-transform hover:scale-105">
            <div className="mr-3 transform transition-transform hover:rotate-6">
              <Image
                src="/images/menu/logo-bhagwati.png"
                alt="Bhagwati Caterers Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
            </div>
            <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Bhagwati Caterers</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-orange-600 transition-all duration-300 font-medium relative group px-4 py-2 rounded-lg hover:bg-orange-50 transform hover:-translate-y-1"
              >
                {item.name}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-orange-600 transition-all duration-300 group-hover:w-3/4 group-hover:left-1/8"></span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-orange-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-orange-100 animate-fadeIn bg-white rounded-lg shadow-lg absolute left-4 right-4 top-full z-50">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-3 px-4 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-all duration-200 rounded-lg mx-2 transform hover:translate-x-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header