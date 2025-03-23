
import { BookOpen, MessageCircle, Phone, Mail } from "lucide-react";

export default function HelpCenterPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Help Center</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="bg-white rounded-lg shadow-md p-6 border border-neutral-200">
          <BookOpen className="h-8 w-8 text-primary mb-4" />
          <h2 className="text-2xl font-semibold mb-4">Documentation</h2>
          <p className="text-neutral-600 mb-4">Browse our comprehensive guides and tutorials</p>
          <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors">
            View Documentation
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border border-neutral-200">
          <MessageCircle className="h-8 w-8 text-primary mb-4" />
          <h2 className="text-2xl font-semibold mb-4">Community Support</h2>
          <p className="text-neutral-600 mb-4">Join our community forum for peer support</p>
          <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors">
            Visit Forum
          </button>
        </div>
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Contact Support</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex items-start">
            <Phone className="h-6 w-6 text-primary mr-4" />
            <div>
              <h3 className="font-semibold mb-2">Phone Support</h3>
              <p className="text-neutral-600">Available Mon-Fri, 9am-5pm EST</p>
            </div>
          </div>
          <div className="flex items-start">
            <Mail className="h-6 w-6 text-primary mr-4" />
            <div>
              <h3 className="font-semibold mb-2">Email Support</h3>
              <p className="text-neutral-600">24/7 response within 24 hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import { PublicNavbar } from "@/components/layouts/public-navbar";
import { Footer } from "@/components/layouts/footer";

export default function HelpPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Help Center</h1>
        <p>Coming soon...</p>
      </main>
      <Footer />
    </div>
  );
}
