import { Metadata } from 'next'
import SEOHead from '@/components/seo/SEOHead'

export const metadata: Metadata = {
  title: 'Privacy Policy - Bhagwati Caterers',
  description: 'भगवती कॅटरर्सच्या वेबसाइट आणि सेवांसाठी गोपनीयता धोरण',
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <SEOHead
        title="Privacy Policy - Bhagwati Caterers"
        description="भगवती कॅटरर्स तुमची गोपनीयता कशी संरक्षित करते आणि तुम्ही आमची वेबसाइट आणि सेवा वापरताना तुमची वैयक्तिक माहिती कशी हाताळते ते जाणून घ्या."
        url="/privacy"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-600 devanagari-paragraph">
            तुमची गोपनीयता आमच्यासाठी महत्त्वाची आहे. हे धोरण आम्ही तुमची माहिती कशी गोळा करतो, वापरतो आणि संरक्षित करतो हे स्पष्ट करते.
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4 devanagari-subheading">१. आम्ही गोळा करत असलेली माहिती</h2>
          <p className="text-gray-600 mb-4 devanagari-paragraph">
            तुम्ही आम्हाला थेट प्रदान करत असलेली माहिती आम्ही गोळा करतो, यासह:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4 ml-4 devanagari-list">
            <li>नाव, ईमेल पत्ता आणि फोन नंबर</li>
            <li>कार्यक्रमाचे तपशील आणि प्राधान्ये</li>
            <li>पेमेंट माहिती</li>
            <li>अभिप्राय आणि प्रशंसापत्रे</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4 devanagari-subheading">२. आम्ही तुमची माहिती कशी वापरतो</h2>
          <p className="text-gray-600 mb-4 devanagari-paragraph">
            आम्ही तुमची माहिती यासाठी वापरतो:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4 ml-4 devanagari-list">
            <li>आमच्या कॅटरिंग सेवा प्रदान करणे आणि सुधारणे</li>
            <li>बुकिंग आणि पेमेंट प्रक्रिया करणे</li>
            <li>तुमच्या कार्यक्रमांबद्दल तुमच्याशी संवाद साधणे</li>
            <li>प्रमोशनल ऑफर पाठवणे (तुमच्या संमतीने)</li>
            <li>कायदेशीर दायित्वांचे पालन करणे</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4 devanagari-subheading">३. माहिती सामायिकरण</h2>
          <p className="text-gray-600 mb-4 devanagari-paragraph">
            आम्ही तुमची वैयक्तिक माहिती तृतीय पक्षांना विकत नाही किंवा भाड्याने देत नाही. आम्ही माहिती सामायिक करू शकतो:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4 ml-4 devanagari-list">
            <li>आमच्या कामकाजात मदत करणाऱ्या सेवा प्रदात्यांसह</li>
            <li>कायद्याने आवश्यक असताना कायदेशीर अधिकाऱ्यांसह</li>
            <li>तुमच्या स्पष्ट संमतीने व्यावसायिक भागीदारांसह</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4 devanagari-subheading">४. डेटा सुरक्षा</h2>
          <p className="text-gray-600 mb-4 devanagari-paragraph">
            तुमची वैयक्तिक माहिती अनधिकृत प्रवेश, बदल, प्रकटीकरण किंवा नाशापासून संरक्षित करण्यासाठी आम्ही योग्य सुरक्षा उपाय राबवतो.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4 devanagari-subheading">५. तुमचे अधिकार</h2>
          <p className="text-gray-600 mb-4 devanagari-paragraph">
            तुम्हाला अधिकार आहे:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4 ml-4 devanagari-list">
            <li>तुमची वैयक्तिक माहिती पाहणे आणि अपडेट करणे</li>
            <li>तुमचा डेटा हटवण्याची विनंती करणे</li>
            <li>मार्केटिंग संप्रेषणातून बाहेर पडणे</li>
            <li>संबंधित अधिकाऱ्यांकडे तक्रार दाखल करणे</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4 devanagari-subheading">६. कुकीज</h2>
          <p className="text-gray-600 mb-4 devanagari-paragraph">
            तुमचा ब्राउझिंग अनुभव वाढवण्यासाठी आणि वेबसाइट ट्रॅफिकचे विश्लेषण करण्यासाठी आम्ही कुकीज वापरतो. तुम्ही तुमच्या ब्राउझर सेटिंग्जद्वारे कुकीज नियंत्रित करू शकता.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4 devanagari-subheading">७. गोपनीयता धोरणातील बदल</h2>
          <p className="text-gray-600 mb-4 devanagari-paragraph">
            आम्ही वेळोवेळी हे धोरण अपडेट करू शकतो. आमच्या वेबसाइटवर नवीन धोरण पोस्ट करून आम्ही तुम्हाला कोणत्याही बदलांची सूचना देऊ.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4 devanagari-subheading">८. आमच्याशी संपर्क साधा</h2>
          <p className="text-gray-600 mb-4 devanagari-paragraph">
            या गोपनीयता धोरणाबद्दल तुमचे काही प्रश्न असल्यास, कृपया आमच्याशी संपर्क साधा:
          </p>
          <p className="text-gray-600 mb-4 devanagari-paragraph">
            ईमेल: privacy@bhagwaticaterer.in<br />
            फोन: +91 9057264895
          </p>
        </div>
      </div>
    </>
  )
}
