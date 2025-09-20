'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, MessageCircle, Calendar, Users, Send, Sparkles, Heart, Award, CheckCircle, Star } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    guestCount: '',
    budget: '',
    venue: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log('Form submitted:', formData)
    setIsSubmitting(false)
    setSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        eventDate: '',
        guestCount: '',
        budget: '',
        venue: '',
        message: ''
      })
    }, 3000)
  }

  const contactMethods = [
    {
      icon: Phone,
      title: 'फोन करा',
      english: 'Call Us',
      subtitle: 'आमच्या टीमशी थेट बोला',
      englishSubtitle: 'Speak directly with our team',
      value: '+91 9057264895',
      action: 'tel:+919057264895',
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700'
    },
    {
      icon: Mail,
      title: 'ईमेल पाठवा',
      english: 'Email Us',
      subtitle: 'आपल्या गरजा आम्हाला पाठवा',
      englishSubtitle: 'Send us your requirements',
      value: 'info@bhagwaticaterer.in',
      action: 'mailto:info@bhagwaticaterer.in',
      color: 'from-green-500 to-green-600',
      hoverColor: 'hover:from-green-600 hover:to-green-700'
    },
    {
      icon: MessageCircle,
      title: 'व्हाट्सअॅप',
      english: 'WhatsApp',
      subtitle: 'त्वरित उत्तरासह चॅट करा',
      englishSubtitle: 'Quick chat with instant response',
      value: 'आता चॅट करा',
      englishValue: 'Chat Now',
      action: 'https://wa.me/919057264895',
      color: 'from-emerald-500 to-emerald-600',
      hoverColor: 'hover:from-emerald-600 hover:to-emerald-700'
    }
  ]

  const features = [
    { icon: CheckCircle, text: '24/7 ग्राहक सेवा', english: '24/7 Customer Support' },
    { icon: Award, text: 'तज्ञ सल्ला', english: 'Expert Consultation' },
    { icon: Star, text: 'सानुकूलित उपाय', english: 'Customized Solutions' },
    { icon: Heart, text: 'समाधानाची हमी', english: 'Satisfaction Guaranteed' }
  ]

  return (
    <>
      <SEOHead
        title="संपर्क करा - Contact Us | Bhagwati Caterers"
        description="भगवती केटरर्स शी संपर्क साधा - Get in touch with Bhagwati Caterers for pure vegetarian catering needs. आमच्याशी फोन, ईमेल किंवा संपर्क फॉर्मद्वारे संपर्क साधा."
        url="/contact"
      />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-6xl text-orange-600 animate-bounce">ॐ</div>
          <div className="absolute bottom-10 right-10 text-6xl text-green-600 animate-bounce" style={{animationDelay: '1s'}}>🕉️</div>
          <div className="absolute top-1/2 left-1/4 text-4xl text-yellow-600 animate-pulse">🌿</div>
          <div className="absolute top-1/3 right-1/4 text-4xl text-orange-600 animate-pulse" style={{animationDelay: '0.5s'}}>🍃</div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="h-8 w-8 text-orange-600 mr-3 animate-spin" style={{animationDuration: '3s'}} />
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 via-yellow-600 to-green-600 bg-clip-text text-transparent" style={{lineHeight: '1.2', paddingTop: '0.5rem', paddingBottom: '0.5rem'}}>
                आमच्याशी संपर्क साधा
              </h1>
              <Sparkles className="h-8 w-8 text-green-600 ml-3 animate-spin" style={{animationDuration: '3s', animationDelay: '1s'}} />
            </div>
            <p className="text-2xl text-gray-700 mb-4">Get In Touch With Us</p>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              अविस्मरणीय आठवणी निर्माण करण्यासाठी तयार आहात? आपल्या कार्यक्रमाची चर्चा करूया आणि परिपूर्ण शाकाहारी केटरिंग अनुभव तयार करूया.
            </p>
            <p className="text-lg text-gray-500 mt-2">
              Ready to create unforgettable memories? Let's discuss your event and craft the perfect vegetarian catering experience together.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon
              return (
                <a
                  key={index}
                  href={method.action}
                  target={method.action.startsWith('http') ? '_blank' : undefined}
                  rel={method.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`group bg-gradient-to-br ${method.color} ${method.hoverColor} text-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105`}
                >
                  <div className="text-center">
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                      <IconComponent className="h-10 w-10" />
                    </div>
                    <h3 className="text-2xl font-bold mb-1">{method.title}</h3>
                    <p className="text-lg text-white/90 mb-2">{method.english}</p>
                    <p className="text-white/80 mb-3">{method.subtitle}</p>
                    <p className="text-sm text-white/70 mb-4">{method.englishSubtitle}</p>
                    <p className="text-lg font-semibold">{method.value || method.englishValue}</p>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200 to-yellow-200 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">आपल्या गरजा आम्हाला पाठवा</h2>
                <p className="text-xl text-gray-700 mb-2">Send Us Your Requirements</p>
                <p className="text-gray-600 mb-8">खालील फॉर्म भरा आणि आम्ही 2 तासांत आपल्याशी संपर्क साधू! • Fill out the form below and we'll get back to you within 2 hours!</p>
                
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="bg-green-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                      <CheckCircle className="h-10 w-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-green-600 mb-2">धन्यवाद!</h3>
                    <p className="text-lg text-gray-700 mb-2">Thank You!</p>
                    <p className="text-gray-600">आपला संदेश यशस्वीरित्या पाठवला गेला आहे. आम्ही लवकरच आपल्याशी संपर्क साधू!</p>
                    <p className="text-gray-500 text-sm mt-2">Your message has been sent successfully. We'll contact you soon!</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                          पूर्ण नाव • Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                          placeholder="आपले पूर्ण नाव • Your Full Name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                          ईमेल पत्ता • Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                          फोन नंबर • Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="eventType" className="block text-sm font-semibold text-gray-700 mb-2">
                          कार्यक्रमाचा प्रकार • Event Type *
                        </label>
                        <select
                          id="eventType"
                          name="eventType"
                          value={formData.eventType}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                        >
                          <option value="">कार्यक्रमाचा प्रकार निवडा • Select Event Type</option>
                          <option value="wedding">लग्न समारंभ • Wedding Ceremony</option>
                          <option value="corporate">कॉर्पोरेट कार्यक्रम • Corporate Event</option>
                          <option value="birthday">वाढदिवस सोहळा • Birthday Celebration</option>
                          <option value="anniversary">वर्धापनदिन • Anniversary</option>
                          <option value="festival">सण उत्सव • Festival Celebration</option>
                          <option value="social">सामाजिक मेळावा • Social Gathering</option>
                          <option value="other">इतर • Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label htmlFor="eventDate" className="block text-sm font-semibold text-gray-700 mb-2">
                          कार्यक्रमाची तारीख • Event Date
                        </label>
                        <input
                          type="date"
                          id="eventDate"
                          name="eventDate"
                          value={formData.eventDate}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="guestCount" className="block text-sm font-semibold text-gray-700 mb-2">
                          पाहुण्यांची संख्या • Guest Count
                        </label>
                        <input
                          type="number"
                          id="guestCount"
                          name="guestCount"
                          value={formData.guestCount}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                          placeholder="50"
                          min="1"
                        />
                      </div>

                      <div>
                        <label htmlFor="budget" className="block text-sm font-semibold text-gray-700 mb-2">
                          बजेट श्रेणी • Budget Range
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                        >
                          <option value="">बजेट निवडा • Select Budget</option>
                          <option value="under-50k">₹50,000 पेक्षा कमी • Under ₹50,000</option>
                          <option value="50k-1l">₹50,000 - ₹1,00,000</option>
                          <option value="1l-2l">₹1,00,000 - ₹2,00,000</option>
                          <option value="2l-5l">₹2,00,000 - ₹5,00,000</option>
                          <option value="above-5l">₹5,00,000 पेक्षा जास्त • Above ₹5,00,000</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="venue" className="block text-sm font-semibold text-gray-700 mb-2">
                        कार्यक्रम स्थळ • Venue Location
                      </label>
                      <input
                        type="text"
                        id="venue"
                        name="venue"
                        value={formData.venue}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                        placeholder="कार्यक्रम स्थळाचा पत्ता किंवा क्षेत्र • Event venue address or area"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                        विशेष गरजा • Special Requirements *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                        placeholder="आपल्या कार्यक्रमाबद्दल, आहारातील प्राधान्ये, विशेष गरजा किंवा कोणतेही प्रश्न आम्हाला सांगा... • Tell us about your event, dietary preferences, special requirements, or any questions you may have..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                          पाठवत आहे... • Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-3" />
                          संदेश पाठवा • Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Address Card */}
              <div className="bg-gradient-to-br from-orange-500 to-yellow-500 text-white p-8 rounded-3xl shadow-2xl">
                <div className="flex items-center mb-6">
                  <MapPin className="h-8 w-8 mr-4" />
                  <div>
                    <h3 className="text-2xl font-bold">आमचे स्थान भेट द्या</h3>
                    <p className="text-lg text-white/90">Visit Our Location</p>
                  </div>
                </div>
                <div className="space-y-2 text-lg">
                  <p>123 Food Street, Andheri West</p>
                  <p>Mumbai, Maharashtra 400058</p>
                  <p>भारत • India</p>
                </div>
                <div className="mt-6 pt-6 border-t border-white/20">
                  <div className="flex items-center">
                    <Clock className="h-6 w-6 mr-3" />
                    <div>
                      <p className="font-semibold">व्यवसायाचे तास • Business Hours</p>
                      <p className="text-white/90">सोम - शनि: सकाळी 9:00 - रात्री 9:00 • Mon - Sat: 9:00 AM - 9:00 PM</p>
                      <p className="text-white/90">रवि: सकाळी 10:00 - संध्याकाळी 6:00 • Sun: 10:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="bg-white rounded-3xl shadow-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">आम्हाला का निवडावे?</h3>
                <p className="text-lg text-gray-600 mb-6">Why Choose Us?</p>
                <div className="space-y-4">
                  {features.map((feature, index) => {
                    const IconComponent = feature.icon
                    return (
                      <div key={index} className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-orange-50 transition-colors duration-300">
                        <div className="bg-orange-100 p-3 rounded-full mr-4">
                          <IconComponent className="h-6 w-6 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          <span className="text-gray-700 font-medium block">{feature.text}</span>
                          <span className="text-gray-500 text-sm">{feature.english}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Quick Response */}
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 text-white p-8 rounded-3xl shadow-2xl">
                <h3 className="text-2xl font-bold mb-2">त्वरित प्रतिसादाची हमी</h3>
                <p className="text-lg text-white/90 mb-4">Quick Response Guarantee</p>
                <p className="text-lg text-white/90 mb-6">
                  आम्ही 2 व्यावसायिक तासांत सर्व चौकशींना उत्तर देतो. तातडीच्या प्रश्नांसाठी, तत्काळ मदतीसाठी आम्हाला थेट कॉल करा.
                </p>
                <p className="text-sm text-white/80 mb-6">
                  We respond to all inquiries within 2 business hours. For urgent queries, call us directly for immediate assistance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="tel:+919057264895" 
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center"
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    आता कॉल करा • Call Now
                  </a>
                  <a 
                    href="https://wa.me/919057264895" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center"
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    व्हाट्सअॅप • WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}