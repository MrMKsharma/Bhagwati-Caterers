import { Metadata } from 'next'
import SEOHead from '@/components/seo/SEOHead'

export const metadata: Metadata = {
  title: 'Terms & Conditions - Bhagwati Caterers',
  description: 'भगवती कॅटरर्सच्या सेवा वापरण्यासाठी अटी आणि शर्ती',
}

export default function TermsOfServicePage() {
  return (
    <>
      <SEOHead
        title="Terms & Conditions - Bhagwati Caterers"
        description="भगवती कॅटरर्सची वेबसाइट आणि सेवा वापरण्यासाठी सेवा अटी वाचा."
        url="/terms"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms & Conditions</h1>
          <p className="text-xl text-gray-600 devanagari-paragraph">
            कृपया आमच्या सेवा वापरण्यापूर्वी या अटी काळजीपूर्वक वाचा.
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4 devanagari-subheading">१. परिचय</h2>
          <p className="text-gray-600 mb-4 devanagari-paragraph">
            भगवती कॅटरर्समध्ये आपले स्वागत आहे. या अटी आणि शर्ती आमच्या वेबसाइट आणि सेवांच्या वापरासाठी नियम आणि नियमांची रूपरेषा देतात.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4 devanagari-subheading">२. सेवा</h2>
          <p className="text-gray-600 mb-4 devanagari-paragraph">
            भगवती कॅटरर्स लग्न, कॉर्पोरेट कार्यक्रम, पार्ट्या आणि इतर विशेष प्रसंगांसह विविध कार्यक्रमांसाठी शुद्ध शाकाहारी कॅटरिंग सेवा प्रदान करते.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4 devanagari-subheading">३. बुकिंग</h2>
          <p className="text-gray-600 mb-4 devanagari-paragraph">
            सर्व बुकिंगसाठी स्वाक्षरी केलेला करार आणि अग्रिम पेमेंट आवश्यक आहे. अग्रिम रक्कम परत करता येत नाही परंतु उपलब्धतेच्या अधीन राहून नवीन तारखेला हस्तांतरित करता येऊ शकते.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4 devanagari-subheading">४. रद्दीकरण</h2>
          <p className="text-gray-600 mb-4 devanagari-paragraph">
            रद्दीकरण लेखी स्वरूपात करणे आवश्यक आहे. सूचना कालावधीच्या आधारावर रद्दीकरण शुल्क लागू होते:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4 ml-4 devanagari-list">
            <li>३० दिवसांपेक्षा जास्त: एकूण बुकिंग रकमेच्या २५%</li>
            <li>१५-३० दिवस: एकूण बुकिंग रकमेच्या ५०%</li>
            <li>१५ दिवसांपेक्षा कमी: एकूण बुकिंग रकमेच्या १००%</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4 devanagari-subheading">५. पेमेंट</h2>
          <p className="text-gray-600 mb-4 devanagari-paragraph">
            कार्यक्रमाच्या ७ दिवस आधी अंतिम पेमेंट देय आहे. आम्ही रोख, बँक ट्रान्सफर आणि प्रमुख क्रेडिट/डेबिट कार्ड स्वीकारतो.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4 devanagari-subheading">६. दायित्व</h2>
          <p className="text-gray-600 mb-4 devanagari-paragraph">
            आमच्या सेवा प्रदान करताना आम्ही सर्व वाजवी काळजी घेतो, परंतु भगवती कॅटरर्स कोणत्याही अप्रत्यक्ष किंवा परिणामी नुकसान किंवा हानीसाठी जबाबदार राहणार नाही.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4 devanagari-subheading">७. अटींमध्ये बदल</h2>
          <p className="text-gray-600 mb-4 devanagari-paragraph">
            आम्ही कधीही या अटी सुधारण्याचा अधिकार राखून ठेवतो. आमच्या वेबसाइटवर पोस्ट केल्यानंतर बदल तातडीने प्रभावी होतील.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4 devanagari-subheading">८. शासकीय कायदा</h2>
          <p className="text-gray-600 mb-4 devanagari-paragraph">
            या अटी भारताच्या कायद्यांनुसार शासित आणि अर्थ लावल्या जातील.
          </p>
        </div>
      </div>
    </>
  )
}
