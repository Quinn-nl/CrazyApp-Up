
import Layout from "@/components/layouts/layout";

export default function TermsPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>

        <div className="space-y-6">
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Service Usage</h2>
            <p className="text-gray-600 mb-4">
              By using ComplianceMate, you agree to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account</li>
              <li>Use the service in compliance with applicable laws</li>
              <li>Not misuse or attempt to abuse our systems</li>
            </ul>
          </section>

          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Subscription Terms</h2>
            <p className="text-gray-600 mb-4">
              Our service is provided on a subscription basis:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Billing occurs on a monthly or annual basis</li>
              <li>Subscriptions auto-renew unless cancelled</li>
              <li>Refunds are provided according to our refund policy</li>
              <li>Service access may be terminated for violation of terms</li>
            </ul>
          </section>

          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Limitations of Liability</h2>
            <p className="text-gray-600 mb-4">
              ComplianceMate is provided "as is" and we:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Make no warranties about service availability</li>
              <li>Are not liable for indirect damages</li>
              <li>Limit liability to fees paid for service</li>
              <li>Reserve the right to modify these terms</li>
            </ul>
          </section>
        </div>
      </div>
    </Layout>
  );
}
