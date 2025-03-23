
import { Building2, Globe2, Users } from "lucide-react";

export default function CareersPage() {
  const positions = [
    {
      title: "Senior Compliance Specialist",
      department: "Compliance",
      location: "Remote",
      type: "Full-time"
    },
    {
      title: "Software Engineer",
      department: "Engineering",
      location: "New York",
      type: "Full-time"
    },
    {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "London",
      type: "Full-time"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Join Our Team</h1>
      
      <div className="grid gap-8 md:grid-cols-3 mb-12">
        <div className="bg-white rounded-lg p-6 border border-neutral-200">
          <Building2 className="h-8 w-8 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Mission-Driven</h3>
          <p className="text-neutral-600">Help companies maintain compliance and build trust.</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-neutral-200">
          <Globe2 className="h-8 w-8 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Remote-First</h3>
          <p className="text-neutral-600">Work from anywhere in the world.</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-neutral-200">
          <Users className="h-8 w-8 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Great Culture</h3>
          <p className="text-neutral-600">Join a diverse and inclusive team.</p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-6">Open Positions</h2>
      <div className="grid gap-4">
        {positions.map((position, index) => (
          <div key={index} className="bg-white rounded-lg p-6 border border-neutral-200 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold mb-2">{position.title}</h3>
              <div className="text-neutral-600">
                {position.department} • {position.location} • {position.type}
              </div>
            </div>
            <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors">
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
import { PublicNavbar } from "@/components/layouts/public-navbar";
import { Footer } from "@/components/layouts/footer";

export default function CareersPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Careers</h1>
        <p>Coming soon...</p>
      </main>
      <Footer />
    </div>
  );
}
