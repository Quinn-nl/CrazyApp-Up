
import { CalendarIcon, PlayCircleIcon } from "lucide-react";

export default function WebinarsPage() {
  const webinars = [
    {
      title: "Getting Started with Compliance Management",
      date: "March 15, 2024",
      duration: "45 minutes",
      description: "Learn the basics of compliance management and how to set up your first compliance program."
    },
    {
      title: "GDPR Deep Dive",
      date: "March 22, 2024",
      duration: "60 minutes",
      description: "Detailed walkthrough of GDPR requirements and how to maintain compliance."
    },
    {
      title: "SOC 2 Compliance Best Practices",
      date: "March 29, 2024",
      duration: "50 minutes",
      description: "Expert tips on achieving and maintaining SOC 2 compliance."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Compliance Webinars</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {webinars.map((webinar, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-neutral-200">
            <PlayCircleIcon className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">{webinar.title}</h3>
            <div className="flex items-center text-sm text-neutral-600 mb-3">
              <CalendarIcon className="h-4 w-4 mr-2" />
              <span>{webinar.date} • {webinar.duration}</span>
            </div>
            <p className="text-neutral-600 mb-4">{webinar.description}</p>
            <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors">
              Watch Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
import { PublicNavbar } from "@/components/layouts/public-navbar";
import { Footer } from "@/components/layouts/footer";

export default function WebinarsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Webinars</h1>
        <p>Coming soon...</p>
      </main>
      <Footer />
    </div>
  );
}
