
import { Book, FileText, Code, Settings } from "lucide-react";

export default function DocsPage() {
  const sections = [
    {
      title: "Getting Started",
      icon: Book,
      topics: ["Quick Start Guide", "Installation", "Basic Concepts"]
    },
    {
      title: "User Guide",
      icon: FileText,
      topics: ["Dashboard Overview", "Managing Compliance", "Reports"]
    },
    {
      title: "API Reference",
      icon: Code,
      topics: ["Authentication", "Endpoints", "Rate Limits"]
    },
    {
      title: "Configuration",
      icon: Settings,
      topics: ["System Settings", "Integrations", "User Management"]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Documentation</h1>
      <div className="grid gap-8 md:grid-cols-2">
        {sections.map((section, index) => {
          const Icon = section.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-neutral-200">
              <Icon className="h-8 w-8 text-primary mb-4" />
              <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
              <ul className="space-y-2">
                {section.topics.map((topic, topicIndex) => (
                  <li key={topicIndex}>
                    <a href="#" className="text-neutral-600 hover:text-primary transition-colors">
                      {topic}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
import { PublicNavbar } from "@/components/layouts/public-navbar";
import { Footer } from "@/components/layouts/footer";

export default function DocumentationPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Documentation</h1>
        <p>Coming soon...</p>
      </main>
      <Footer />
    </div>
  );
}
