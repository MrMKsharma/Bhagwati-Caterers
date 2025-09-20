import { Metadata } from 'next'
import SEOHead from '@/components/seo/SEOHead'

export const metadata: Metadata = {
  title: 'Shipping Policy - Bhagwati Caterers',
  description: 'Shipping policy for Bhagwati Caterers services',
}

export default function ShippingPolicyPage() {
  return (
    <>
      <SEOHead
        title="Shipping Policy - Bhagwati Caterers"
        description="Understand Bhagwati Caterers' shipping policy for our catering services and event bookings."
        url="/shipping"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Removed Breadcrumbs component */}
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shipping Policy</h1>
          <p className="text-xl text-gray-600">
            Our policy on shipping and delivery for catering services.
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">1. Service Area</h2>
          <p className="text-gray-600 mb-4">
            Bhagwati Caterers provides catering services within a 50-kilometer radius of Mumbai, Maharashtra. For locations beyond this radius, additional transportation charges may apply.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">2. Delivery Zones</h2>
          <p className="text-gray-600 mb-4">
            Our delivery zones are categorized as follows:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4 ml-4">
            <li><strong>Zone A (0-15 km):</strong> Included in base price</li>
            <li><strong>Zone B (15-30 km):</strong> Additional ₹500 delivery charge</li>
            <li><strong>Zone C (30-50 km):</strong> Additional ₹1,000 delivery charge</li>
            <li><strong>Beyond 50 km:</strong> Custom quotation required</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">3. Delivery Timing</h2>
          <p className="text-gray-600 mb-4">
            We deliver catering services 1 hour before the scheduled event time to ensure food is served at optimal temperature and freshness.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">4. Setup Services</h2>
          <p className="text-gray-600 mb-4">
            Our standard package includes basic table setup with serving utensils. Additional setup services (decorative arrangements, specialized serving equipment) are available at extra cost.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">5. Equipment</h2>
          <p className="text-gray-600 mb-4">
            We provide all necessary serving equipment including:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4 ml-4">
            <li>Serving trays and platters</li>
            <li>Cutlery and crockery</li>
            <li>Glassware for beverages</li>
            <li>Chafing dishes for hot food</li>
            <li>Tablecloths and napkins</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">6. Pickup Option</h2>
          <p className="text-gray-600 mb-4">
            Customers may choose to pickup their catering order from our kitchen facility. Please coordinate with our team for pickup timing and container requirements.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">7. Special Requirements</h2>
          <p className="text-gray-600 mb-4">
            For special delivery requirements (multiple locations, specific timing, etc.), please inform us at least 48 hours in advance. Additional charges may apply.
          </p>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">8. Contact Information</h2>
          <p className="text-gray-600 mb-4">
            For shipping and delivery inquiries, please contact us at:
          </p>
          <p className="text-gray-600 mb-4">
            Email: delivery@bhagwaticaterer.in<br />
            Phone: +91 9057264895<br />
            Address: 123 Catering Street, Mumbai, Maharashtra 400001
          </p>
        </div>
      </div>
    </>
  )
}