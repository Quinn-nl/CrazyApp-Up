
import { FC } from 'react';

interface Guide {
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

const guides: Guide[] = [
  {
    title: "Getting Started with GDPR",
    description: "Learn the basics of GDPR compliance and how to implement key requirements.",
    category: "GDPR",
    difficulty: "Beginner"
  },
  {
    title: "HIPAA Compliance Checklist",
    description: "Complete guide to achieving HIPAA compliance for your SaaS platform.",
    category: "HIPAA",
    difficulty: "Intermediate"
  },
  {
    title: "SOC 2 Audit Preparation",
    description: "Step-by-step preparation guide for SOC 2 certification.",
    category: "SOC 2",
    difficulty: "Advanced"
  }
];

const GuideCard: FC<Guide> = ({ title, description, category, difficulty }) => (
  <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <span className={`px-3 py-1 rounded-full text-sm ${
      difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
      difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
      'bg-red-100 text-red-800'
    }`}>
      {difficulty}
    </span>
    <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
      {category}
    </span>
    <h3 className="mt-4 text-xl font-semibold text-gray-900">{title}</h3>
    <p className="mt-2 text-gray-600">{description}</p>
    <button className="mt-4 text-blue-600 hover:text-blue-800">
      Read More →
    </button>
  </div>
);

export default function GuidesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Compliance Guides</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((guide, index) => (
          <GuideCard key={index} {...guide} />
        ))}
      </div>
    </div>
  );
}
