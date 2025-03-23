
export default function SecurityPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Security Practices</h1>
      
      <div className="space-y-8">
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Data Encryption</h2>
          <p className="text-gray-600">
            All data is encrypted at rest using AES-256 encryption and in transit using TLS 1.3.
            We implement end-to-end encryption for sensitive data transmission.
          </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Access Control</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Role-based access control (RBAC)</li>
            <li>Multi-factor authentication (MFA)</li>
            <li>Regular access reviews</li>
            <li>Detailed audit logging</li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Infrastructure Security</h2>
          <p className="text-gray-600">
            Our infrastructure is hosted in SOC 2 compliant data centers with 24/7 monitoring,
            regular penetration testing, and automated vulnerability scanning.
          </p>
        </section>
      </div>
    </div>
  );
}
