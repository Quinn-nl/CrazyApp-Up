
import Layout from "@/components/layouts/layout";

export default function PrivacyPolicyPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

        <div className="space-y-6">
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Data Collection and Usage</h2>
            <p className="text-gray-600 mb-4">
              We collect and process personal data to provide and improve our compliance management services. This includes:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Account information (name, email, company details)</li>
              <li>Usage data and analytics</li>
              <li>Compliance documentation and records</li>
              <li>Communication preferences</li>
            </ul>
          </section>

          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Data Protection</h2>
            <p className="text-gray-600 mb-4">
              We implement industry-standard security measures to protect your data:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>End-to-end encryption for sensitive data</li>
              <li>Regular security audits and updates</li>
              <li>Secure data centers and backup systems</li>
              <li>Access controls and authentication</li>
            </ul>
          </section>

          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
            <p className="text-gray-600 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Access your personal data</li>
              <li>Request data correction or deletion</li>
              <li>Object to data processing</li>
              <li>Data portability</li>
            </ul>
          </section>
        </div>
      </div>
    </Layout>
  );
}
