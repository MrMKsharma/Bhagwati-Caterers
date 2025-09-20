'use client'

import { Users, Award, Clock, Heart, ChefHat, Star, Trophy, Target, Eye, Sparkles, Crown, Calendar, MapPin, Phone, Mail, Globe } from 'lucide-react'
import Link from 'next/link'
import SEOHead from '@/components/seo/SEOHead'

export default function AboutPage() {
  const achievements = [
    { number: '25+', label: 'वर्षांचा अनुभव', english: 'Years of Experience' },
    { number: '10,000+', label: 'समाधानकारक ग्राहक', english: 'Happy Customers' },
    { number: '50,000+', label: 'यशस्वी कार्यक्रम', english: 'Successful Events' },
    { number: '100%', label: 'शुद्ध शाकाहारी', english: 'Pure Vegetarian' }
  ]

  const values = [
    {
      icon: Heart,
      title: 'उत्साह',
      english: 'Passion',
      description: 'आम्ही अन्न आणि आपल्या ग्राहकांना आनंद देणार्या अनुभवांबद्दल उत्साही आहोत.',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: Award,
      title: 'उत्कृष्टता',
      english: 'Excellence',
      description: 'आम्ही प्रत्येक व्यंजन, प्रत्येक सेवा आणि प्रत्येक संवादामध्ये उत्कृष्टतेसाठी प्रयत्न करतो.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Users,
      title: 'संघटना',
      english: 'Teamwork',
      description: 'आमचा समर्पित संघ एकत्र काम करतो जेणेकरून सुरळीत प्रसंग वाहणे सुनिश्चित होईल.',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      icon: Clock,
      title: 'विश्वसनीयता',
      english: 'Reliability',
      description: 'आपण वेळेवर, प्रत्येक वेळी, तहकार केल्याशिवाय आमच्यावर विश्वास ठेवू शकता.',
      color: 'from-green-500 to-emerald-500'
    }
  ]



  const specialties = [
    { text: 'पारंपारिक महाराष्ट्रीय पाककृती', english: 'Traditional Maharashtrian Cuisine', icon: '🏺' },
    { text: 'उत्तर भारतीय व्यंजने', english: 'North Indian Delicacies', icon: '🍛' },
    { text: 'दक्षिण भारतीय स्पेशल', english: 'South Indian Specials', icon: '🥥' },
    { text: 'गुजराती थाळी', english: 'Gujarati Thali', icon: '🍽️' },
    { text: 'जैन भोजन विशेषज्ञता', english: 'Jain Food Expertise', icon: '🙏' },
    { text: 'फास्ट फूड आणि चाट', english: 'Fast Food & Chaat', icon: '🌮' }
  ]

  return (
    <>
      <SEOHead
        title="About Us - Bhagwati Caterers | Pure Vegetarian Catering Excellence"
        description="Discover the story of Bhagwati Caterers - 25+ years of pure vegetarian catering excellence in Maharashtra. Learn about our values, team, and commitment to authentic cuisine."
        url="/about"
      />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-orange-600 via-amber-500 to-orange-800 text-white overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 text-8xl animate-bounce-subtle">ॐ</div>
          <div className="absolute bottom-10 right-10 text-8xl animate-bounce-subtle">ॐ</div>
          <div className="absolute top-1/2 left-1/4 text-6xl animate-pulse">🕉️</div>
          <div className="absolute top-1/3 right-1/4 text-6xl animate-pulse">🌿</div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="h-10 w-10 text-yellow-300 mr-4 animate-spin" style={{ animationDuration: '3s' }} />
            <h1 className="text-5xl md:text-7xl font-bold animate-fade-in-up" style={{ lineHeight: '1.2', paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
              भगवती केटरर्स बद्दल
            </h1>
            <Sparkles className="h-10 w-10 text-yellow-300 ml-4 animate-spin" style={{ animationDuration: '3s', animationDelay: '1s' }} />
          </div>
          <p className="text-2xl md:text-3xl mb-4 text-yellow-200 animate-fade-in-up delay-100">About Bhagwati Caterers</p>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed animate-fade-in-up delay-200">
            1998 पासून आपल्या विशेष क्षणांमध्ये गौरवाचे भोजन आणि उत्कृष्ट सेवा आणून देणे
          </p>
          <p className="text-lg text-yellow-100 mt-4 animate-fade-in-up delay-300">
            Bringing pride and excellence to your special moments since 1998
          </p>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-amber-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 text-9xl text-orange-600">🏆</div>
          <div className="absolute bottom-20 right-20 text-9xl text-green-600">⭐</div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Trophy className="h-8 w-8 text-orange-600 mr-3" />
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                आमची उपलब्धी
              </h2>
              <Trophy className="h-8 w-8 text-yellow-600 ml-3" />
            </div>
            <p className="text-xl text-gray-700">Our Achievements & Milestones</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border border-orange-100">
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                    {achievement.number}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{achievement.label}</h3>
                  <p className="text-sm text-gray-600">{achievement.english}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center mb-6">
                <Crown className="h-8 w-8 text-orange-600 mr-3" />
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                  आमची कथा
                </h2>
              </div>
              <p className="text-xl text-gray-700 mb-2">Our Story</p>

              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  भगवती केटरर्स ही एका साध्या कुटुंबीय व्यवसायापासून सुरू झालेली आहे ज्याचे एक साधे मिशन होते:
                  स्मरणीय डायनिंग अनुभव निर्माण करणे जे लोकांना एकत्र आणते. एका घरातील किचनमधून सुरू झालेले
                  हे आज प्रक्षेत्रातील सर्वात विश्वसनीय भोजन सेवा प्रदात्यांपैकी एक झाले आहे.
                </p>

                <p className="text-lg">
                  1998 मध्ये श्री शांतिलाल महाराज यांनी फक्त 5 जणांच्या टीमसह सुरुवात केली होती. त्यांचे स्वप्न होते -
                  प्रत्येक महाराष्ट्रीयन घरात शुद्ध, स्वादिष्ट आणि पौष्टिक अन्न पोहोचवणे. आज आमच्याकडे 100+
                  कुशल कर्मचाऱ्यांची टीम आहे.
                </p>

                <p className="text-lg">
                  वर्षांमध्ये, आम्हाला अंतर्मुखी कुटुंबीय भेटींपासून गौरवाच्या कॉर्पोरेट सोहळ्यांपर्यंत हजारो
                  प्रसंगांचे भोजन करण्याची सुविधा मिळाली आहे. आज, आम्हाला पारंपारिक नुस्ख्यांना आधुनिक
                  भोजन तंत्रज्ञानाशी जोडण्यावर गौरव आहे.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-3 rounded-full font-semibold">
                  🏆 ISO 22000 प्रमाणित
                </div>
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full font-semibold">
                  🌿 100% शुद्ध शाकाहारी
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="bg-gradient-to-br from-orange-200 via-yellow-200 to-green-200 h-96 lg:h-[500px] rounded-3xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="text-center">
                    <div className="text-6xl mb-4">👨‍🍳</div>
                    <span className="text-orange-800 font-bold text-xl">आमची कथा</span>
                    <p className="text-orange-700 mt-2">Our Journey Since 1998</p>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <span className="font-bold text-gray-800">25+ Years</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-6xl text-orange-600 animate-bounce">🎯</div>
          <div className="absolute bottom-10 right-10 text-6xl text-green-600 animate-bounce animation-delay-1s">👁️</div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-orange-100">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-orange-500 to-yellow-500 p-4 rounded-full mr-4">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-800">आमचे ध्येय</h3>
                  <p className="text-lg text-gray-600">Our Mission</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                प्रत्येक प्रसंगाला विशेष बनवणे, उत्कृष्ट शुद्ध शाकाहारी भोजन आणि अतुलनीय सेवेद्वारे.
                आम्ही फक्त अन्न पुरवत नाही, तर आनंदाचे क्षण निर्माण करतो जे आयुष्यभर आठवतात.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">गुणवत्ता</span>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">सेवा</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">नवाचार</span>
              </div>
            </div>

            {/* Vision */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-green-100">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-4 rounded-full mr-4">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-800">आमची दृष्टी</h3>
                  <p className="text-lg text-gray-600">Our Vision</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                महाराष्ट्रातील सर्वात विश्वसनीय आणि आवडत्या शुद्ध शाकाहारी केटरिंग सेवा बनणे.
                आम्ही पारंपारिक चवींना आधुनिक तंत्रज्ञानाशी जोडून भविष्यातील पिढ्यांसाठी
                आमची वारसा तयार करत आहोत.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">नेतृत्व</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">वारसा</span>
                <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium">भविष्य</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <Heart className="h-8 w-8 text-orange-600 mr-3" />
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                आमची मूल्ये
              </h2>
              <Heart className="h-8 w-8 text-yellow-600 ml-3" />
            </div>
            <p className="text-xl text-gray-700 mb-4">Our Core Values</p>
            <p className="text-gray-600 max-w-3xl mx-auto">
              हे मूलभूत मूल्ये आम्हाला मार्गदर्शन करतात आणि प्रत्येक वेळी उत्कृष्ट सेवा प्रदान करण्याची खातरजमा करतात.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <div key={index} className={`group bg-gradient-to-br ${value.color} text-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden`}>
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>

                  <div className="relative z-10 text-center">
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                      <IconComponent className="h-10 w-10" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{value.title}</h3>
                    <p className="text-lg text-white/90 mb-4">{value.english}</p>
                    <p className="text-white/80 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Our Specialties */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-6xl text-orange-600 animate-pulse">🍛</div>
          <div className="absolute bottom-10 right-10 text-6xl text-green-600 animate-pulse animation-delay-1s">🥥</div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <ChefHat className="h-8 w-8 text-orange-600 mr-3" />
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                आमची विशेषता
              </h2>
              <ChefHat className="h-8 w-8 text-yellow-600 ml-3" />
            </div>
            <p className="text-xl text-gray-700">Our Culinary Specialties</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialties.map((specialty, index) => (
              <div key={index} className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border border-orange-100">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-br from-orange-400 to-yellow-400 p-3 rounded-full mr-4 group-hover:rotate-12 transition-transform duration-300 text-2xl">
                    {specialty.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
                      {specialty.text}
                    </h3>
                    <p className="text-sm text-gray-600">{specialty.english}</p>
                  </div>
                </div>
                <div className="h-1 bg-gradient-to-r from-orange-400 via-yellow-400 to-green-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-gradient-to-br from-orange-500 via-yellow-500 to-green-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 text-6xl animate-pulse">📞</div>
          <div className="absolute bottom-10 right-10 text-6xl animate-pulse animation-delay-1s">📧</div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center mb-6">
            <Phone className="h-8 w-8 mr-3" />
            <h2 className="text-4xl md:text-5xl font-bold">आमच्याशी संपर्क साधा</h2>
            <Mail className="h-8 w-8 ml-3" />
          </div>
          <p className="text-xl mb-8">Get in Touch with Us</p>
          <p className="text-lg mb-12 max-w-3xl mx-auto">
            आपल्या पुढील कार्यक्रमाची चर्चा करण्यासाठी आज आमच्याशी संपर्क साधा. आम्ही आपल्या स्वप्नांचा प्रसंग साकार करण्यासाठी तयार आहोत!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
              <Phone className="h-8 w-8 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">फोन करा</h3>
              <p className="text-white/90">+91 98765 43210</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
              <Mail className="h-8 w-8 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">ईमेल पाठवा</h3>
              <p className="text-white/90">info@bhagwaticaterers.com</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
              <MapPin className="h-8 w-8 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">भेट द्या</h3>
              <p className="text-white/90">पुणे, महाराष्ट्र</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/contact"
              className="bg-white text-orange-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center justify-center"
            >
              <Calendar className="h-5 w-5 mr-2" />
              आमच्याशी संपर्क साधा
            </Link>
            <Link
              href="/services"
              className="border-2 border-white text-white hover:bg-white hover:text-orange-600 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
            >
              <Globe className="h-5 w-5 mr-2" />
              आमच्या सेवा पहा
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
