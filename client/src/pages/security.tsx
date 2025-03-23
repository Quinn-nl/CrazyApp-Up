
import Layout from "@/components/layouts/layout";
import { Shield, Lock, UserCheck, Database } from "lucide-react";

export default function SecurityPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Security Practices</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <Shield className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Data Protection</h3>
            <p className="text-gray-600">Enterprise-grade security measures to protect your sensitive data.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <Lock className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Encryption</h3>
            <p className="text-gray-600">End-to-end encryption for all data in transit and at rest.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <UserCheck className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Access Control</h3>
            <p className="text-gray-600">Role-based access control and multi-factor authentication.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <Database className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Data Centers</h3>
            <p className="text-gray-600">Globally distributed data centers with redundancy.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
