import Layout from "@/components/layouts/layout";

export default function GuidesPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Guides & Resources</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example guide cards */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Getting Started Guide {i}</h3>
              <p className="text-gray-600 mb-4">Learn how to implement compliance best practices in your organization.</p>
              <button className="text-primary hover:text-primary-dark font-medium">Read More →</button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}