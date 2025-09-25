'use client'

import Link from 'next/link'
import { Calendar, Users, Utensils, Gift, Leaf, Building, Heart, Sparkles, Crown, Award, CheckCircle } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'

export default function ServicesPage() {
  const services = [
    {
      icon: Heart,
      title: 'विवाह भोजन सेवा',
      english: 'Wedding Catering',
      description: 'आपल्या विशेष दिवसाला आमच्या उत्कृष्ट लग्न भोजन सेवेसह अविस्मरणीय बनवा. अंतरंग समारंभापासून भव्य उत्सवांपर्यंत.',
      englishDescription: 'Make your special day unforgettable with our exquisite wedding catering services.',
      features: ['सानुकूल मेनू नियोजन', 'व्यावसायिक सेवा कर्मचारी', 'सुंदर प्रस्तुती', 'वधू-वर विशेष सुविधा'],
      englishFeatures: ['Custom menu planning', 'Professional service staff', 'Beautiful presentation', 'Bridal and groom favors'],
      color: 'from-pink-500 to-rose-500',
      hoverColor: 'hover:from-pink-600 hover:to-rose-600',
      emoji: '💒'
    },
    {
      icon: Building,
      title: 'कॉर्पोरेट कार्यक्रम',
      english: 'Corporate Events',
      description: 'आपल्या ग्राहक आणि सहकाऱ्यांवर चिरस्थायी छाप पाडणारी व्यावसायिक कॉर्पोरेट केटरिंग.',
      englishDescription: 'Professional corporate catering that leaves a lasting impression.',
      features: ['कॉर्पोरेट लंच', 'व्यावसायिक बैठका', 'बोर्ड मीटिंग्स', 'कार्यालयीन पार्ट्या'],
      englishFeatures: ['Corporate lunch', 'Business meetings', 'Board meetings', 'Office parties'],
      color: 'from-blue-500 to-indigo-500',
      hoverColor: 'hover:from-blue-600 hover:to-indigo-600',
      emoji: '🏢'
    },
    {
      icon: Gift,
      title: 'वाढदिवस समारंभ',
      english: 'Birthday Parties',
      description: 'सर्व वयोगटांसाठी आनंदाने आणि स्वादिष्ट शाकाहारी पदार्थांसह वाढदिवस साजरे करा.',
      englishDescription: 'Celebrate birthdays with joy and delicious vegetarian treats for all ages.',
      features: ['थीम सजावट', 'मुलांसाठी विशेष पर्याय', 'वाढदिवसाचा केक', 'मजेदार प्रस्तुती'],
      englishFeatures: ['Themed decorations', 'Kid-friendly options', 'Birthday cake', 'Fun presentation'],
      color: 'from-purple-500 to-violet-500',
      hoverColor: 'hover:from-purple-600 hover:to-violet-600',
      emoji: '🎂'
    },
    {
      icon: Users,
      title: 'सामाजिक मेळावे',
      english: 'Social Gatherings',
      description: 'कुटुंबीय मेळावे, वर्धापनदिन आणि प्रियजनांसह अंतरंग मेळाव्यांसाठी परिपूर्ण.',
      englishDescription: 'Perfect for family gatherings, anniversaries, and intimate get-togethers.',
      features: ['कुटुंबीय शैलीतील सेवा', 'आरामदायक अन्न पर्याय', 'लवचिक व्यवस्था', 'घरगुती वातावरण'],
      englishFeatures: ['Family-style service', 'Comfort food options', 'Flexible arrangements', 'Home-like atmosphere'],
      color: 'from-green-500 to-emerald-500',
      hoverColor: 'hover:from-green-600 hover:to-emerald-600',
      emoji: '👨‍👩‍👧‍👦'
    },
    {
      icon: Calendar,
      title: 'सण उत्सव भोजन',
      english: 'Festival Catering',
      description: 'अस्सल प्रादेशिक पाककृतीसह पारंपारिक आणि सांस्कृतिक सण उत्सव.',
      englishDescription: 'Traditional and cultural festival celebrations with authentic regional cuisines.',
      features: ['सण विशेष पदार्थ', 'सांस्कृतिक प्रामाणिकता', 'मोठ्या गटासाठी सेवा', 'पारंपारिक सजावट'],
      englishFeatures: ['Festival specials', 'Cultural authenticity', 'Large group service', 'Traditional decorations'],
      color: 'from-orange-500 to-yellow-500',
      hoverColor: 'hover:from-orange-600 hover:to-yellow-600',
      emoji: '🎉'
    },
    {
      icon: Utensils,
      title: 'घरपोच सेवा',
      english: 'Home Delivery',
      description: 'आपल्या घरापर्यंत ताजे पोहोचवलेले रेस्तरां दर्जाचे शाकाहारी अन्नाचा आनंद घ्या.',
      englishDescription: 'Enjoy restaurant-quality vegetarian food delivered fresh to your doorstep.',
      features: ['ताजे तयार केलेले', 'वेळेवर डिलिव्हरी', 'पर्यावरणपूरक पॅकेजिंग', 'नियमित जेवण योजना'],
      englishFeatures: ['Freshly prepared', 'Timely delivery', 'Eco-friendly packaging', 'Regular meal plans'],
      color: 'from-teal-500 to-cyan-500',
      hoverColor: 'hover:from-teal-600 hover:to-cyan-600',
      emoji: '🚚'
    }
  ]

  const whyChooseUs = [
    {
      icon: Award,
      title: 'कुशल टीम',
      english: 'Expert Team',
      description: 'अनुभवी व्यावसायिक शेफ आणि सेवा कर्मचारी',
      englishDescription: 'Experienced professional chefs and service staff'
    },
    {
      icon: Calendar,
      title: 'लवचिक नियोजन',
      english: 'Flexible Planning',
      description: 'आपल्या गरजांनुसार सानुकूल मेनू आणि सेवा',
      englishDescription: 'Custom menus and services tailored to your needs'
    },
    {
      icon: Leaf,
      title: 'ताजे साहित्य',
      english: 'Fresh Ingredients',
      description: 'सर्व पदार्थांमध्ये फक्त उत्कृष्ट, ताजे साहित्य',
      englishDescription: 'Only the finest, fresh ingredients in all dishes'
    },
    {
      icon: Heart,
      title: 'बारकाईने लक्ष',
      english: 'Attention to Detail',
      description: 'काळजीपूर्वक नियोजन आणि निर्दोष अंमलबजावणी',
      englishDescription: 'Careful planning and flawless execution'
    }
  ]

  return (
    <>
      <SEOHead
        title="आमच्या सेवा - Our Services | Bhagwati Caterers"
        description="लग्न, कॉर्पोरेट कार्यक्रम, पार्टी आणि सर्व विशेष प्रसंगांसाठी व्यावसायिक शाकाहारी केटरिंग सेवा. Professional vegetarian catering services in Maharashtra."
        url="/services"
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
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 via-yellow-600 to-green-600 bg-clip-text text-transparent" style={{lineHeight: '1.3', paddingTop: '0.5rem', paddingBottom: '0.5rem'}}>
                आमच्या सेवा
              </h1>
              <Sparkles className="h-8 w-8 text-green-600 ml-3 animate-spin" style={{animationDuration: '3s', animationDelay: '1s'}} />
            </div>
            <p className="text-2xl text-gray-700 mb-4">Our Catering Services</p>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              आपल्या विशेष प्रसंगांना अस्सल पाककृती आणि अपवादात्मक सेवेसह संस्मरणीय बनवण्यासाठी तयार केलेल्या व्यावसायिक शाकाहारी केटरिंग सेवा.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              return (
                <div 
                  key={index} 
                  className={`group bg-gradient-to-br ${service.color} ${service.hoverColor} text-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden`}
                >
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
                  
                  <div className="relative z-10">
                    <div className="text-center mb-6">
                      <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 text-3xl">
                        {service.emoji}
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                      <p className="text-lg text-white/90 mb-4">{service.english}</p>
                      <p className="text-white/80 mb-2">{service.description}</p>
                      <p className="text-sm text-white/70">{service.englishDescription}</p>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">आम्ही काय देतो • What We Offer:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start text-white/90 text-sm">
                            <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
                            <div>
                              <div>{feature}</div>
                              <div className="text-xs text-white/70">{service.englishFeatures[featureIndex]}</div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Link 
                      href="/contact" 
                      className="block w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-center py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      आमच्याशी संपर्क साधा • Contact Us
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Crown className="h-8 w-8 text-orange-600 mr-3" />
              <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                आम्हाला का निवडावे?
              </h2>
              <Crown className="h-8 w-8 text-yellow-600 ml-3" />
            </div>
            <p className="text-xl text-gray-600">Why Choose Our Services?</p>
            <p className="text-gray-600 max-w-3xl mx-auto mt-4">
              आम्ही आपल्या कार्यक्रमाला संस्मरणीय आणि तणावमुक्त बनवण्यासाठी अतिरिक्त प्रयत्न करतो.
            </p>
            <p className="text-gray-500 text-sm max-w-2xl mx-auto mt-2">
              We go the extra mile to make your event memorable and stress-free.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => {
              const IconComponent = item.icon
              return (
                <div key={index} className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105">
                  <div className="bg-gradient-to-br from-orange-500 to-yellow-500 text-white p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                    <IconComponent className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-lg text-orange-600 font-semibold mb-3">{item.english}</p>
                  <p className="text-gray-600 mb-2">{item.description}</p>
                  <p className="text-gray-500 text-sm">{item.englishDescription}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-orange-500 via-yellow-500 to-green-500 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 text-6xl text-white animate-pulse">ॐ</div>
          <div className="absolute bottom-10 right-10 text-6xl text-white animate-pulse" style={{animationDelay: '1s'}}>🕉️</div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            आपल्या कार्यक्रमाची योजना करण्यास तयार आहात?
          </h2>
          <p className="text-xl text-white/90 mb-2">Ready to Plan Your Event?</p>
          <p className="text-lg text-white/80 mb-8 max-w-4xl mx-auto">
            सल्लामसलतीसाठी आज आमच्याशी संपर्क साधा आणि आम्ही आपल्या कार्यक्रमाला कसे असाधारण बनवू शकतो याची चर्चा करूया.
          </p>
          <p className="text-sm text-white/70 mb-8 max-w-3xl mx-auto">
            Contact us today for consultation and let&apos;s discuss how we can make your event extraordinary.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/contact" 
              className="bg-white text-orange-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center justify-center"
            >
              <Calendar className="h-5 w-5 mr-2" />
              सल्लामसलत मिळवा • Get Consultation
            </Link>
            <Link 
              href="/packages" 
              className="border-2 border-white text-white hover:bg-white hover:text-orange-600 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
            >
              <Gift className="h-5 w-5 mr-2" />
              पॅकेजेस पहा • View Packages
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}