import { Metadata } from 'next'
import SEOHead from '@/components/seo/SEOHead'

export const metadata: Metadata = {
  title: 'परतावा धोरण - Bhagwati Caterers',
  description: 'भगवती कॅटरर्सच्या सेवांसाठी परतावा धोरण',
}

export default function RefundPolicyPage() {
  return (
    <>
      <SEOHead
        title="परतावा धोरण - Bhagwati Caterers"
        description="भगवती कॅटरर्सच्या कॅटरिंग सेवा आणि कार्यक्रम बुकिंगसाठी परतावा धोरण समजून घ्या."
        url="/refund"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Removed Breadcrumbs component */}
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 devanagari-heading">परतावा धोरण</h1>
          <p className="text-xl text-gray-600 devanagari-paragraph">
            कॅटरिंग सेवांसाठी परतावा आणि रद्दीकरणाचे आमचे धोरण.
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4 devanagari-subheading">१. सामान्य धोरण</h2>
          <p className="text-gray-600 mb-4 devanagari-paragraph">
            भगवती कॅटरर्समध्ये, आम्ही संपूर्ण ग्राहक समाधान सुनिश्चित करण्याचा प्रयत्न करतो. ग्राहकाने दिलेल्या मेनू निवड, पाहुण्यांची संख्या आणि कार्यक्रमाच्या तपशीलांवर आधारित सर्व बुकिंग पुष्ट केली जाते.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4 devanagari-subheading">२. अग्रिम रक्कम धोरण</h2>
          <p className="text-gray-600 mb-4 devanagari-paragraph">
            तुमचे आरक्षण पुष्ट करण्यासाठी एकूण बुकिंग रकमेच्या २५% अग्रिम रक्कम आवश्यक आहे. ही अग्रिम रक्कम परत करता येत नाही परंतु उपलब्धता आणि व्यवस्थापनाच्या मंजुरीच्या अधीन राहून नवीन तारखेला हस्तांतरित करता येऊ शकते.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4 devanagari-subheading">३. रद्दीकरण परतावा</h2>
          <p className="text-gray-600 mb-4 devanagari-paragraph">
            रद्दीकरणासाठी परतावा खालीलप्रमाणे प्रक्रिया केली जाते:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4 ml-4 devanagari-list">
            <li><strong>कार्यक्रमाच्या ३० दिवसांपूर्वी:</strong> एकूण रकमेच्या ७५% परतावा</li>
            <li><strong>कार्यक्रमाच्या १५-३० दिवसांपूर्वी:</strong> एकूण रकमेच्या ५०% परतावा</li>
            <li><strong>कार्यक्रमाच्या १५ दिवसांपेक्षा कमी:</strong> परतावा नाही</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4 devanagari-subheading">४. कार्यक्रमाच्या तारखेतील बदल</h2>
          <p className="text-gray-600 mb-4 devanagari-paragraph">
            ग्राहक मूळ कार्यक्रमाच्या तारखेच्या ४८ तासांपूर्वी त्यांच्या कार्यक्रमाची तारीख पुन्हा निर्धारित करू शकतात. ₹१,००० पुनर्निर्धारण शुल्क लागू होऊ शकते. बदल उपलब्धतेच्या अधीन आहेत.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4 devanagari-subheading">५. सेवा समस्या</h2>
          <p className="text-gray-600 mb-4 devanagari-paragraph">
            सेवेतील समस्या किंवा मान्य केलेल्या मानकांची पूर्तता न झाल्यास, ग्राहकांनी आम्हाला तातडीने कळवावे. आम्ही समस्येचे निराकरण करण्यासाठी कार्य करू आणि भविष्यातील सेवांसाठी आंशिक परतावा किंवा क्रेडिट देऊ शकतो.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4 devanagari-subheading">६. अपरिहार्य परिस्थिती</h2>
          <p className="text-gray-600 mb-4 devanagari-paragraph">
            अपरिहार्य परिस्थितीच्या घटनांमध्ये (नैसर्गिक आपत्ती, सरकारी निर्बंध इ.), आम्ही ग्राहकांसोबत कार्यक्रम पुन्हा निर्धारित करण्यासाठी किंवा जास्तीत जास्त शक्य परतावा प्रदान करण्यासाठी कार्य करू.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4 devanagari-subheading">७. परतावा प्रक्रिया</h2>
          <p className="text-gray-600 mb-4 devanagari-paragraph">
            कार्यक्रमाच्या तारखेपासून ३० दिवसांच्या आत परतावा विनंत्या लेखी स्वरूपात सादर करणे आवश्यक आहे. प्रक्रियेला सामान्यतः ७-१४ कामकाजाचे दिवस लागतात. परतावा मूळ पेमेंट पद्धतीवर जारी केला जाईल.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4 devanagari-subheading">८. संपर्क माहिती</h2>
          <p className="text-gray-600 mb-4 devanagari-paragraph">
            परतावा विनंत्या किंवा प्रश्नांसाठी, कृपया आमच्याशी संपर्क साधा:
          </p>
          <p className="text-gray-600 mb-4 devanagari-paragraph">
            ईमेल: refunds@bhagwaticaterer.in<br />
            फोन: +91 9057264895<br />
            पत्ता: 123 Catering Street, Mumbai, Maharashtra 400001
          </p>
        </div>
      </div>
    </>
  )
}