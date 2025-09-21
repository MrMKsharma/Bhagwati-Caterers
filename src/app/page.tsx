'use client'

import Link from 'next/link'
import { ChefHat, Users, Calendar, Award, Star, ArrowRight } from 'lucide-react'
import { useEffect, useState, useCallback } from 'react'
import { BusinessStructuredData, ServiceStructuredData, ReviewStructuredData } from '@/components/seo/StructuredData'


interface Testimonial {
  id: string
  name: string
  rating: number
  comment: string
  isApproved: boolean
  createdAt: string
}

export default function Home() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [testimonialsLoading, setTestimonialsLoading] = useState(true)

  const fetchTestimonials = useCallback(async () => {
    try {
      const response = await fetch('/api/testimonials')
      if (response.ok) {
        const data = await response.json()
        setTestimonials((data || []).slice(0, 3)) // Show only first 3
      }
    } catch (error) {
      console.error('Failed to fetch testimonials:', error)
    } finally {
      setTestimonialsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTestimonials()
  }, [fetchTestimonials])

  return (
    <div>
      {/* SEO Structured Data */}
      <BusinessStructuredData />
      <ServiceStructuredData />
      {testimonials.length > 0 && (
        <ReviewStructuredData 
          reviews={testimonials.map(t => ({
            author: t.name,
            rating: t.rating,
            text: t.comment,
            datePublished: t.createdAt
          }))}
        />
      )}
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-600 via-amber-500 to-orange-800 text-white py-20 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 text-8xl animate-bounce-subtle">ॐ</div>
          <div className="absolute bottom-10 right-10 text-8xl animate-bounce-subtle">ॐ</div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up" style={{lineHeight: '1.3', paddingTop: '0.5rem', paddingBottom: '0.5rem'}}>
            महाराष्ट्रातील शुद्ध शाकाहारी भोजन
            <span className="block text-yellow-300 mt-2">अद्वितीय प्रसंगांसाठी</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-fade-in-up delay-100" style={{lineHeight: '1.6', paddingTop: '0.25rem', paddingBottom: '0.25rem'}}>
            अंतर्मुखी जमलेल्यांपासून गौरवाच्या सोहळ्यांपर्यंत, आम्ही शुद्ध शाकाहारी भोजनाची उत्कृष्टता आणून देतो 
            आणि आपल्या विशेष क्षणांना स्मरणीय बनवण्यासाठी अपरिमित सेवा प्रदान करतो.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-200">
            <Link href="/contact" className="btn-primary inline-flex items-center transform hover:scale-105 transition-transform">
              आमच्याशी संपर्क साधा
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/menu" className="btn-secondary inline-flex items-center transform hover:scale-105 transition-transform">
              मेनू पहा
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              भगवती केटरर्स निवडण्याचे कारण?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              आम्ही अपेक्षित अधिक असलेल्या शुद्ध शाकाहारी भोजनाच्या अनुभवांची वचनबद्धता घेतली आहे.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <ChefHat className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">तज्ज्ञ शेफ</h3>
              <p className="text-gray-600">ताजे, चवदार अन्न तयार करणारे अनुभवी शाकाहारी भोजन क्षेत्रातील तज्ज्ञ शेफ</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <Users className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">व्यावसायिक सेवा</h3>
              <p className="text-gray-600">सुरळीत कार्यक्रम वाहण्यासाठी समर्पित कर्मचारी</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <Calendar className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">लवचिक योजना</h3>
              <p className="text-gray-600">कोणत्याही प्रसंगासाठी सानुकूल मेनू आणि सेवा</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <Award className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">गुणवत्ता खातरजमा</h3>
              <p className="text-gray-600">प्रीमियम साहित्य आणि तपशीलांकडे उत्कृष्ट लक्ष देणे</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-6xl text-orange-600 animate-bounce">ॐ</div>
          <div className="absolute bottom-10 right-10 text-6xl text-green-600 animate-bounce animation-delay-1s">🕉️</div>
          <div className="absolute top-1/2 left-1/4 text-4xl text-yellow-600 animate-pulse">🌿</div>
          <div className="absolute top-1/3 right-1/4 text-4xl text-orange-600 animate-pulse animation-delay-0-5s">🍃</div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <span className="text-4xl mr-3 animate-spin animation-delay-3s">✨</span>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-yellow-600 to-green-600 bg-clip-text text-transparent devanagari-heading">
                आमच्या शुद्ध शाकाहारी भोजन सेवा
              </h2>
              <span className="text-4xl ml-3 animate-spin animation-delay-3s-1s">✨</span>
            </div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              लग्नांपासून कॉर्पोरेट कार्यक्रमांपर्यंत, आम्ही सर्व प्रसंगांसाठी शुद्ध शाकाहारी भोजन आणि सुंदर प्रस्तुती प्रदान करतो.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "शुद्ध वेज लग्न भोजन",
                english: "Pure Veg Wedding Meals",
                description: "आपल्या विशेष दिवसाला पूर्ण करा आमच्या सुंदर लग्न भोजन सेवेसह.",
                icon: "💒"
              },
              {
                title: "कॉर्पोरेट शाकाहारी कार्यक्रम",
                english: "Corporate Vegetarian Events", 
                description: "भेटी, परिषदा आणि कॉर्पोरेट कार्यक्रमांसाठी व्यावसायिक भोजन.",
                icon: "🏢"
              },
              {
                title: "पारंपारिक उत्सव भोजन",
                english: "Traditional Festival Meals",
                description: "धार्मिक आणि सांस्कृतिक उत्सवांसाठी पारंपारिक आणि समकालीन मेनू.",
                icon: "🎉"
              },
              {
                title: "जैन अन्न विशेषज्ञता",
                english: "Jain Food Specialties",
                description: "जैन धर्मीय नियमांनुसार तयार केलेले विशेष अन्न.",
                icon: "🙏"
              },
              {
                title: "दक्षिण भारतीय शाकाहारी",
                english: "South Indian Vegetarian",
                description: "दक्षिण भारतीय पारंपारिक शाकाहारी पदार्थांची विविधता.",
                icon: "🥥"
              },
              {
                title: "उत्तर भारतीय शाकाहारी",
                english: "North Indian Vegetarian", 
                description: "उत्तर भारतीय शाकाहारी पदार्थांचा समृद्ध स्वाद.",
                icon: "🍛"
              },
              {
                title: "वाढदिवस पार्टी",
                english: "Birthday Party Catering",
                description: "आमच्या मजेदार आणि चवदार वाढदिवस पार्टी भोजनासह शैलीत सोहळा करा.",
                icon: "🎂"
              },
              {
                title: "सामाजिक जमलेल्या",
                english: "Social Gatherings",
                description: "कुटुंबीय भेटी, वर्धापनदिन आणि विशेष सोहळ्यांसाठी परिपूर्ण.",
                icon: "👨‍👩‍👧‍👦"
              },
              {
                title: "घरी डिलिव्हरी",
                english: "Home Delivery Service",
                description: "आपल्या घरापर्यंत ताजे वितरित केलेले रेस्तरं दर्जाचे अन्न आनंद घ्या.",
                icon: "🚚"
              }
            ].map((service, index) => (
              <div key={index} className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border border-orange-100">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-br from-green-400 to-green-600 p-3 rounded-full mr-4 group-hover:rotate-12 transition-transform duration-300 text-2xl">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-orange-600 transition-colors" style={{lineHeight: '1.5', paddingTop: '0.25rem', paddingBottom: '0.25rem'}}>
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                      {service.english}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="h-1 bg-gradient-to-r from-orange-400 via-yellow-400 to-green-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 mb-4"></div>
                <Link href="/services" className="text-orange-600 hover:text-orange-700 font-medium inline-flex items-center group">
                  अधिक जाणून घ्या
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center bg-white/90 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg">
              <span className="text-2xl mr-3 animate-pulse">🌿</span>
              <span className="text-lg font-semibold text-gray-800">
                100% Pure Vegetarian • Authentic Flavors • Premium Quality
              </span>
              <span className="text-2xl ml-3 animate-pulse" style={{animationDelay: '0.5s'}}>🌿</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              आमच्या ग्राहकांचे मत
            </h2>
            <p className="text-gray-600">आमच्या सेवेबद्दल समाधानकारक ग्राहकांचे अनुभव ऐका.</p>
          </div>
          
          {testimonialsLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
            </div>
          ) : testimonials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">&ldquo;{testimonial.comment}&rdquo;</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(testimonial.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">अद्याप कोणतेही प्रतिक्रिया उपलब्ध नाहीत.</p>
              <Link href="/testimonials" className="text-orange-600 hover:text-orange-700 font-medium mt-2 inline-block">
                पहिला असण्याची संधी!
              </Link>
            </div>
          )}
          
          {testimonials.length > 0 && (
            <div className="text-center mt-8">
              <Link href="/testimonials" className="text-orange-600 hover:text-orange-700 font-medium inline-flex items-center group">
                आपला अनुभव सामायिक करा
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            आपला परिपूर्ण प्रसंग योजनाबद्ध करण्यासाठी तयार?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            आजच आमच्याशी संपर्क साधा विनामूल्य सल्लामसलतीसाठी आणि आपला प्रसंग अद्वितीय बनवू द्या.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-orange-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105">
              आमच्याशी संपर्क साधा
            </Link>
            <Link href="/packages" className="border-2 border-white text-white hover:bg-white hover:text-orange-600 font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105">
              पॅकेज पहा
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
