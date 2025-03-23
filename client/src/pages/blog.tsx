
import { Calendar, User } from "lucide-react";

export default function BlogPage() {
  const posts = [
    {
      title: "Understanding GDPR Compliance in 2024",
      author: "Sarah Johnson",
      date: "March 10, 2024",
      excerpt: "A comprehensive guide to maintaining GDPR compliance in the evolving digital landscape."
    },
    {
      title: "Top 5 Compliance Challenges for SaaS Companies",
      author: "Michael Chen",
      date: "March 5, 2024",
      excerpt: "Explore the most common compliance challenges faced by SaaS companies and how to address them."
    },
    {
      title: "The Future of Compliance Automation",
      author: "Emily Rodriguez",
      date: "March 1, 2024",
      excerpt: "Discover how AI and automation are transforming compliance management."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Compliance Insights Blog</h1>
      <div className="grid gap-8">
        {posts.map((post, index) => (
          <article key={index} className="bg-white rounded-lg shadow-md p-6 border border-neutral-200">
            <h2 className="text-2xl font-semibold mb-3">{post.title}</h2>
            <div className="flex items-center text-sm text-neutral-600 mb-4">
              <User className="h-4 w-4 mr-2" />
              <span className="mr-4">{post.author}</span>
              <Calendar className="h-4 w-4 mr-2" />
              <span>{post.date}</span>
            </div>
            <p className="text-neutral-600 mb-4">{post.excerpt}</p>
            <button className="text-primary hover:text-primary/90 font-medium">
              Read More →
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
import { PublicNavbar } from "@/components/layouts/public-navbar";
import { Footer } from "@/components/layouts/footer";

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        <p>Coming soon...</p>
      </main>
      <Footer />
    </div>
  );
}
