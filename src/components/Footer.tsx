import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Leaf, Award, Heart } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-10 left-10 text-6xl animate-pulse">ॐ</div>
        <div className="absolute bottom-10 right-10 text-6xl animate-pulse">ॐ</div>
        <div className="absolute top-1/2 left-1/4 text-4xl opacity-30">🕉️</div>
        <div className="absolute top-1/3 right-1/4 text-4xl opacity-30">🌿</div>
      </div>
      
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-orange-500 mb-4 flex items-center">
              <Leaf className="mr-2" /> Bhagwati Caterers
            </h3>
            <p className="text-gray-300 mb-6 leading-loose devanagari-paragraph">
              महाराष्ट्रातील आघाडीची शुद्ध शाकाहारी भोजन सेवा! आम्ही आपल्या सर्व विशेष प्रसंगांसाठी प्रामाणिक शाकाहारी पाककृती 
              आणि उत्कृष्ट सेवा आणून देतो, आपल्या स्मरणीय क्षणांना खरोखरच अविस्मरणीय बनवतो.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-orange-600 hover:bg-orange-700 p-3 rounded-full transition-all duration-300 transform hover:scale-110 flex items-center justify-center w-12 h-12">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-orange-600 hover:bg-orange-700 p-3 rounded-full transition-all duration-300 transform hover:scale-110 flex items-center justify-center w-12 h-12">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-orange-600 hover:bg-orange-700 p-3 rounded-full transition-all duration-300 transform hover:scale-110 flex items-center justify-center w-12 h-12">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center text-orange-400">
              <Award className="mr-2" /> Legal
            </h4>
            <ul className="space-y-3">
              <li><Link href="/terms" className="text-gray-300 hover:text-orange-400 transition-colors hover:translate-x-1 transform duration-200 flex items-center"><span className="mr-2">→</span>Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="text-gray-300 hover:text-orange-400 transition-colors hover:translate-x-1 transform duration-200 flex items-center"><span className="mr-2">→</span>Privacy Policy</Link></li>
              <li><Link href="/refund" className="text-gray-300 hover:text-orange-400 transition-colors hover:translate-x-1 transform duration-200 flex items-center"><span className="mr-2">→</span>परतावा धोरण</Link></li>
              <li><Link href="/cancellation" className="text-gray-300 hover:text-orange-400 transition-colors hover:translate-x-1 transform duration-200 flex items-center"><span className="mr-2">→</span>Cancellation Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-orange-400">Get In Touch</h4>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-start space-x-3 group">
                <MapPin className="h-5 w-5 text-orange-500 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-white transition-colors">
                  123 Food Street, Andheri West<br />
                  Mumbai, Maharashtra 400058<br />
                  India
                </span>
              </div>
              <div className="flex items-center space-x-3 group">
                <Phone className="h-5 w-5 text-orange-500 group-hover:scale-110 transition-transform" />
                <a href="tel:+919057264895" className="group-hover:text-white transition-colors">+91 9057264895</a>
              </div>
              <div className="flex items-center space-x-3 group">
                <Mail className="h-5 w-5 text-orange-500 group-hover:scale-110 transition-transform" />
                <a href="mailto:info@bhagwaticaterer.in" className="group-hover:text-white transition-colors">info@bhagwaticaterer.in</a>
              </div>
              <div className="flex items-start space-x-3 group">
                <Clock className="h-5 w-5 text-orange-500 mt-1 group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-white transition-colors">
                  Mon - Sat: 9:00 AM - 9:00 PM<br />
                  Sun: 10:00 AM - 6:00 PM
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 py-6 relative z-10 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-400">
            <p className="flex items-center justify-center">
              &copy; 2024 Bhagwati Caterers. All rights reserved. 
              <Heart className="h-4 w-4 mx-2 text-red-500 animate-pulse" />
              Crafted with love for memorable experiences.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer