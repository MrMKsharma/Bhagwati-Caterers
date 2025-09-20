import { Metadata } from 'next'
import SEOHead from '@/components/seo/SEOHead'

export const metadata: Metadata = {
  title: 'Cancellation Policy - Bhagwati Caterers',
  description: 'भगवती कॅटरर्सच्या सेवांसाठी रद्दीकरण धोरण',
}

export default function CancellationPolicyPage() {
  return (
    <>
      <SEOHead
        title="Cancellation Policy - Bhagwati Caterers"
        description="भगवती कॅटरर्सच्या कॅटरिंग सेवा आणि कार्यक्रम बुकिंगसाठी रद्दीकरण धोरण समजून घ्या."
        url="/cancellation"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cancellation Policy</h1>
          <p className="text-xl text-gray-600 devanagari-paragraph">
            कॅटरिंग सेवांसाठी रद्दीकरण आणि बदलाचे आमचे धोरण.
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4 devanagari-subheading">१. रद्दीकरण सूचना</h2>
          <p className="text-gray-600 mb-4 devanagari-paragraph">
            सर्व रद्दीकरण लेखी स्वरूपात (ईमेल किंवा पत्र) करणे आवश्यक आहे. फोनवरील रद्दीकरण स्वीकारले जाणार नाही. रद्दीकरणाची पुष्टी आमच्याकडून लेखी स्वरूपात मिळेल.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4 devanagari-subheading">२. रद्दीकरण शुल्क</h2>
          <p className="text-gray-600 mb-4 devanagari-paragraph">
            कार्यक्रमाच्या तारखेपूर्वी दिलेल्या सूचनेच्या आधारावर रद्दीकरण शुल्क लागू होते:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4 ml-4 devanagari-list">
            <li><strong>४५ दिवसांपेक्षा जास्त:</strong> केवळ अग्रिम रक्कम कपात (२५%)</li>
            <li><strong>३०-४५ दिवस:</strong> एकूण रकमेच्या ४०% कपात</li>
            <li><strong>१५-३० दिवस:</strong> एकूण रकमेच्या ६०% कपात</li>
            <li><strong>७-१५ दिवस:</strong> एकूण रकमेच्या ८०% कपात</li>
            <li><strong>७ दिवसांपेक्षा कमी:</strong> संपूर्ण रक्कम कपात (१००%)</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4 devanagari-subheading">३. कार्यक्रमाच्या तारखेतील बदल</h2>
          <p className="text-gray-600 mb-4 devanagari-paragraph">
            कार्यक्रमाची तारीख बदलणे हे रद्दीकरण मानले जाणार नाही, परंतु खालील अटी लागू होतील:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4 ml-4 devanagari-list">
            <li>कार्यक्रमाच्या ७२ तासांपूर्वी तारीख बदल करता येईल</li>
            <li>नवीन तारीख ६ महिन्यांच्या आत असावी</li>
            <li>तारीख बदलासाठी ₹२,००० प्रक्रिया शुल्क लागू होईल</li>
            <li>उपलब्धतेच्या अधीन राहून बदल केले जातील</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4 devanagari-subheading">४. पाहुण्यांच्या संख्येतील बदल</h2>
          <p className="text-gray-600 mb-4 devanagari-paragraph">
            पाहुण्यांच्या संख्येत बदल करण्यासाठी:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4 ml-4 devanagari-list">
            <li><strong>संख्या वाढवणे:</strong> कार्यक्रमाच्या ४८ तासांपूर्वी सूचना द्या</li>
            <li><strong>संख्या कमी करणे:</strong> कार्यक्रमाच्या ७ दिवसांपूर्वी सूचना द्या</li>
            <li>२०% पेक्षा जास्त संख्या कमी केल्यास अतिरिक्त शुल्क लागू होईल</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4 devanagari-subheading">५. आपत्कालीन परिस्थिती</h2>
          <p className="text-gray-600 mb-4 devanagari-paragraph">
            खालील परिस्थितींमध्ये विशेष विचार केला जाईल:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4 ml-4 devanagari-list">
            <li>कुटुंबातील मृत्यू किंवा गंभीर आजार</li>
            <li>नैसर्गिक आपत्ती किंवा सरकारी निर्बंध</li>
            <li>कोविड-१९ सारख्या महामारीच्या परिस्थिती</li>
            <li>योग्य कागदपत्रे सादर केल्यास विशेष सवलत दिली जाईल</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4 devanagari-subheading">६. परतावा प्रक्रिया</h2>
          <p className="text-gray-600 mb-4 devanagari-paragraph">
            रद्दीकरणानंतर परतावा प्रक्रिया:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4 ml-4 devanagari-list">
            <li>रद्दीकरणाच्या पुष्टीनंतर १०-१५ कामकाजाचे दिवस</li>
            <li>मूळ पेमेंट पद्धतीवरच परतावा</li>
            <li>बँक शुल्क, यदि कोणते असेल तर ग्राहकाकडून कपात</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4 devanagari-subheading">७. संपर्क माहिती</h2>
          <p className="text-gray-600 mb-4 devanagari-paragraph">
            रद्दीकरण किंवा बदलासाठी संपर्क साधा:
          </p>
          <p className="text-gray-600 mb-4 devanagari-paragraph">
            ईमेल: cancellation@bhagwaticaterer.in<br />
            फोन: +91 9057264895<br />
            कार्यालयीन वेळ: सकाळी ९:०० ते संध्याकाळी ७:००<br />
            पत्ता: 123 Catering Street, Mumbai, Maharashtra 400001
          </p>
          
          <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mt-8">
            <p className="text-orange-800 font-semibold devanagari-paragraph">
              महत्त्वाची सूचना: रद्दीकरणाच्या सर्व विनंत्या लेखी स्वरूपात करा आणि आमच्याकडून पुष्टी मिळवा. मौखिक रद्दीकरण मान्य केले जाणार नाही.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}