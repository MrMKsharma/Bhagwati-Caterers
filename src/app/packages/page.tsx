'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Users, Utensils, Gift, Star, CheckCircle, Crown, Sparkles, Heart, Award } from 'lucide-react'
import SEOHead from '@/components/seo/SEOHead'
import { Package, DisplayPackage } from '@/types/api'

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)

  const fetchPackages = useCallback(async () => {
    try {
      const response = await fetch('/api/packages')
      if (response.ok) {
        const data = await response.json()
        setPackages(data.packages)
      }
    } catch (error) {
      console.error('Failed to fetch packages:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPackages()
  }, [fetchPackages])

  // शुद्ध शाकाहारी पॅकेजेस - Pure Vegetarian packages
  const fallbackPackages: DisplayPackage[] = [
    {
      id: '1',
      name: 'सामान्य शुद्ध शाकाहारी पॅकेज',
      englishName: 'Basic Pure Veg Package',
      description: 'छोट्या कुटुंबीय मेळाव्यांसाठी पारंपारिक शाकाहारी जेवण',
      englishDescription: 'Traditional vegetarian fare for intimate family gatherings',
      minGuests: 25,
      maxGuests: 75,
      items: JSON.stringify([
        'स्वागत पेये: ताजे लिंबू पाणी, ताक • Welcome Drinks: Fresh Lime Water, Buttermilk',
        'स्टार्टर्स: समोसे, ढोकळे, पनीर टिक्का • Starters: Samosas, Dhokla, Paneer Tikka',
        'मुख्य जेवण: डाळ तडका, जिरे भात, मिक्स भाजी • Main Course: Dal Tadka, Jeera Rice, Mixed Vegetables',
        'भाकरी: रोटी, पराठा • Bread: Roti, Paratha',
        'मिष्टान्न: गुलाब जामुन किंवा रसमलाई • Dessert: Gulab Jamun or Rasmalai',
        'व्यावसायिक सेवा कर्मचारी • Professional Service Staff',
        'ताज्या फुलांसह मूलभूत टेबल सेटअप • Basic Table Setup with Fresh Flowers'
      ]),
      pricePerPerson: 249,
      isActive: true,
      createdAt: new Date().toISOString(),
      popular: false,
      icon: '🌿',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: '2',
      name: 'प्रीमियम शुद्ध शाकाहारी पॅकेज',
      englishName: 'Premium Pure Veg Package',
      description: 'पारंपारिक विशेषतांसह अस्सल शाकाहारी पाककृती',
      englishDescription: 'Authentic vegetarian cuisine with traditional specialties',
      minGuests: 50,
      maxGuests: 150,
      items: JSON.stringify([
        'स्वागत क्षेत्र: ताजे नारळ पाणी, हंगामी फळांचे रस • Welcome Area: Fresh Coconut Water, Seasonal Fruit Juices',
        'लाइव्ह चाट काउंटर: भेळ पुरी, सेव पुरी, दही पुरी • Live Chaat Counter: Bhel Puri, Sev Puri, Dahi Puri',
        'गरम स्टार्टर्स: पनीर पकोडे, आलू टिकी, हरा भरा कबाब • Hot Starters: Paneer Pakoda, Aloo Tikki, Hara Bhara Kebab',
        'मुख्य जेवण: 3 डाळ प्रकार, बासमती पुलाव, छोले भटूरे • Main Course: 3 Dal Varieties, Basmati Pulao, Chole Bhature',
        'प्रादेशिक स्पेशल: राजस्थानी गट्टे की सब्जी, पंजाबी कढी • Regional Specials: Rajasthani Gatte ki Sabzi, Punjabi Kadhi',
        'भाकरी स्टेशन: तवा रोटी, नान, कुल्चा • Bread Station: Tawa Roti, Naan, Kulcha',
        'मिष्टान्न काउंटर: जलेबी, राबडी, कुल्फी, ताजी हंगामी फळे • Dessert Counter: Jalebi, Rabri, Kulfi, Fresh Seasonal Fruits',
        'पारंपारिक पोशाखातील प्रीमियम सेवा कर्मचारी • Premium Service Staff with Traditional Attire',
        'मंडप शैलीतील सुंदर सजावट • Elegant Mandap-style Decoration'
      ]),
      pricePerPerson: 399,
      isActive: true,
      createdAt: new Date().toISOString(),
      popular: true,
      icon: '👑',
      color: 'from-orange-500 to-yellow-500'
    },
    {
      id: '3',
      name: 'रॉयल शुद्ध शाकाहारी पॅकेज',
      englishName: 'Royal Pure Veg Package',
      description: 'राजसी वागणुकीसह विलासी शाकाहारी मेजवानी',
      englishDescription: 'Luxurious vegetarian feast with royal treatment',
      minGuests: 100,
      maxGuests: 500,
      items: JSON.stringify([
        'राजसी स्वागत: पारंपारिक आरती, गुलाब जल हात धुणे • Royal Welcome: Traditional Aarti, Rose Water Hand Wash',
        'प्रीमियम पेय स्टेशन: ताजे ऊस रस, लस्सी प्रकार • Premium Beverage Station: Fresh Sugarcane Juice, Lassi Varieties',
        'लाइव्ह कुकिंग स्टेशन्स: डोसा काउंटर, पास्ता काउंटर, चायनीज वॉक • Live Cooking Stations: Dosa Counter, Pasta Counter, Chinese Wok',
        'विदेशी स्टार्टर्स: तंदूरी सोया चाप, स्टफ्ड मशरूम • Exotic Starters: Tandoori Soya Chaap, Stuffed Mushrooms',
        'गौरमेट मुख्य जेवण: शाही पनीर, दम बिर्याणी, डाळ मखनी • Gourmet Main Course: Shahi Paneer, Dum Biryani, Dal Makhani',
        'प्रादेशिक पाककृती: दक्षिण भारतीय, गुजराती थाळी, बंगाली मिठाई • Regional Cuisines: South Indian, Gujarati Thali, Bengali Sweets',
        'लाइव्ह भाकरी काउंटर: तंदूर नान, मिस्सी रोटी, चीज गार्लिक नान • Live Bread Counter: Tandoor Naan, Missi Roti, Cheese Garlic Naan',
        'मिष्टान्न एक्स्ट्रावागान्झा: लाइव्ह जलेबी, कुल्फी बार, गुलाब जामुन फाउंटन • Dessert Extravaganza: Live Jalebi, Kulfi Bar, Gulab Jamun Fountain',
        'समर्पित इव्हेंट मॅनेजर आणि प्रीमियम कर्मचारी • Dedicated Event Manager and Premium Staff',
        'पारंपारिक घटक आणि प्रकाशासह राजसी सजावट • Royal Decor with Traditional Elements and Lighting'
      ]),
      pricePerPerson: 599,
      isActive: true,
      createdAt: new Date().toISOString(),
      popular: false,
      icon: '💎',
      color: 'from-purple-500 to-pink-500'
    }
  ]

  const displayPackages = packages.length > 0 ? packages : fallbackPackages

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <>
      <SEOHead
        title="केटरिंग पॅकेजेस - Catering Packages | Bhagwati Caterers"
        description="आमचे सानुकूलित शाकाहारी केटरिंग पॅकेजेस शोधा - लग्न, कॉर्पोरेट कार्यक्रम, पार्टी आणि विशेष प्रसंगांसाठी. Discover our customizable pure vegetarian catering packages."
        url="/packages"
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
                आमचे केटरिंग पॅकेजेस
              </h1>
              <Sparkles className="h-8 w-8 text-green-600 ml-3 animate-spin" style={{animationDuration: '3s', animationDelay: '1s'}} />
            </div>
            <p className="text-2xl text-gray-700 mb-4">Our Catering Packages</p>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              आपल्या विशेष प्रसंगांना स्वादिष्ट अन्न आणि अपवादात्मक सेवेसह संस्मरणीय बनवण्यासाठी डिझाइन केलेले 
              आमचे काळजीपूर्वक तयार केलेले शाकाहारी केटरिंग पॅकेजेस शोधा.
            </p>
            <p className="text-lg text-gray-500 mt-4">
              Discover our thoughtfully crafted vegetarian catering packages designed to make your 
              special occasions memorable with delicious food and exceptional service.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Packages Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Crown className="h-8 w-8 text-orange-600 mr-3" />
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                आमचे पॅकेज पर्याय
              </h2>
              <Crown className="h-8 w-8 text-yellow-600 ml-3" />
            </div>
            <p className="text-xl text-gray-700">Our Package Options</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {displayPackages.map((pkg) => {
              let features: string[] = []
              try {
                features = JSON.parse(pkg.items)
              } catch {
                features = pkg.items ? pkg.items.split(',').map((item: string) => item.trim()) : []
              }
              
              const isPopular = pkg.popular || pkg.name.toLowerCase().includes('premium')
              
              return (
                <div key={pkg.id} className={`group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden border-2 ${
                  isPopular ? 'border-orange-500 ring-2 ring-orange-200' : 'border-gray-200 hover:border-orange-300'
                }`}>
                  {/* Gradient Header */}
                  <div className={`absolute top-0 left-0 right-0 h-24 bg-gradient-to-r ${pkg.color || 'from-gray-400 to-gray-500'} rounded-t-3xl`}></div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-2 right-2 w-16 h-16 bg-white/20 rounded-full"></div>
                  <div className="absolute top-4 left-4 w-12 h-12 bg-white/20 rounded-full"></div>
                  
                  {isPopular && (
                    <div className="absolute top-2 right-2 bg-orange-500 text-white px-3 py-1 rounded-full z-10 flex items-center text-xs font-bold">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      लोकप्रिय
                    </div>
                  )}
                  
                  <div className="relative z-10 pt-16">
                    {/* Icon and Title */}
                    <div className="text-center mb-4">
                      <div className="bg-white shadow-lg p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center text-3xl group-hover:rotate-12 transition-transform duration-300 -mt-8">
                        {pkg.icon || '🍽️'}
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{pkg.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{pkg.englishName}</p>
                      <p className="text-gray-700 text-sm mb-2">{pkg.description}</p>
                      <p className="text-xs text-gray-500">{pkg.englishDescription}</p>
                    </div>
                    
                    {/* Pricing */}
                    <div className="text-center mb-4 bg-gray-50 rounded-xl p-4">
                      <div className="text-3xl font-bold text-orange-600 mb-1">
                        ₹{pkg.pricePerPerson.toLocaleString()}
                        <span className="text-sm font-normal text-gray-600">/व्यक्ती</span>
                      </div>
                      <div className="flex items-center justify-center text-gray-600 text-sm">
                        <Users className="h-4 w-4 mr-1" />
                        {pkg.minGuests}{pkg.maxGuests ? `-${pkg.maxGuests}` : '+'} पाहुणे • guests
                      </div>
                    </div>
                    
                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-3 text-center text-sm">यामध्ये समाविष्ट आहे • What&apos;s Included:</h4>
                      <div className="bg-gray-50 rounded-xl p-3 max-h-48 overflow-y-auto">
                        <ul className="space-y-1">
                          {features.slice(0, 6).map((feature: string, index: number) => (
                            <li key={index} className="flex items-start text-xs">
                              <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700 leading-tight">{feature}</span>
                            </li>
                          ))}
                          {features.length > 6 && (
                            <li className="text-xs text-gray-500 text-center pt-2">
                              +{features.length - 6} अधिक आयटम • +{features.length - 6} more items
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col space-y-2">
                      <Link 
                        href="/contact"
                        className={`w-full text-center font-semibold py-2.5 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 text-sm ${
                          isPopular 
                            ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg' 
                            : 'bg-gray-800 hover:bg-gray-900 text-white'
                        }`}
                      >
                        आता बुक करा • Book Now
                      </Link>
                      <Link 
                        href="/menu"
                        className="w-full text-center border-2 border-gray-300 hover:border-orange-500 text-gray-700 hover:text-orange-600 font-semibold py-2.5 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 text-sm"
                      >
                        मेनू पहा • View Menu
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Additional Services Section */}
        <section className="py-16 bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 text-6xl text-orange-600 animate-pulse">🎉</div>
            <div className="absolute bottom-10 right-10 text-6xl text-green-600 animate-pulse animation-delay-1s">🍽️</div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <Gift className="h-8 w-8 text-orange-600 mr-3" />
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                  अतिरिक्त सेवा
                </h2>
                <Gift className="h-8 w-8 text-yellow-600 ml-3" />
              </div>
              <p className="text-xl text-gray-700">Additional Services</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: '🎪', title: 'सजावट सेवा', english: 'Decoration Services', desc: 'पारंपारिक आणि आधुनिक सजावट' },
                { icon: '🎵', title: 'संगीत व्यवस्था', english: 'Music Arrangement', desc: 'डीजे आणि लाइव्ह संगीत' },
                { icon: '📸', title: 'फोटोग्राफी', english: 'Photography', desc: 'व्यावसायिक फोटो आणि व्हिडिओ' },
                { icon: '🚐', title: 'वाहतूक सेवा', english: 'Transportation', desc: 'पाहुण्यांसाठी वाहतूक व्यवस्था' }
              ].map((service, index) => (
                <div key={index} className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border border-orange-100">
                  <div className="text-center">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{service.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{service.english}</p>
                    <p className="text-xs text-gray-500">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-orange-500 via-yellow-500 to-green-500 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 text-6xl animate-pulse">📞</div>
            <div className="absolute bottom-10 right-10 text-6xl animate-pulse animation-delay-1s">📧</div>
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="flex items-center justify-center mb-6">
              <Heart className="h-8 w-8 mr-3" />
              <h2 className="text-4xl md:text-5xl font-bold">आपले परिपूर्ण पॅकेज सानुकूलित करा</h2>
              <Heart className="h-8 w-8 ml-3" />
            </div>
            <p className="text-xl mb-4">Customize Your Perfect Package</p>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              आपण जे शोधत आहात ते दिसत नाही? आपल्या अनोख्या कार्यक्रमाच्या गरजांनुसार वैयक्तिकृत 
              शाकाहारी केटरिंग अनुभव तयार करण्यासाठी आमच्याशी संपर्क साधा.
            </p>
            <p className="text-sm text-white/80 mb-12">
              Don&apos;t see exactly what you&apos;re looking for? Contact us to create a personalized 
              vegetarian catering experience tailored to your unique event needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link 
                href="/contact" 
                className="bg-white text-orange-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center justify-center"
              >
                <Award className="h-5 w-5 mr-2" />
                सानुकूल कोटेशन मिळवा • Get Custom Quote
              </Link>
              <Link 
                href="/menu" 
                className="border-2 border-white text-white hover:bg-white hover:text-orange-600 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
              >
                <Utensils className="h-5 w-5 mr-2" />
                संपूर्ण मेनू पहा • Browse Full Menu
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}