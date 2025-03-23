
import { Check } from "lucide-react";
import { PublicNavbar } from "@/components/layouts/public-navbar";
import { Footer } from "@/components/layouts/footer";

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "49",
      description: "Perfect for small teams getting started",
      features: [
        "Up to 5 team members",
        "Basic compliance templates",
        "Email support",
        "Monthly reports"
      ]
    },
    {
      name: "Professional",
      price: "99",
      description: "For growing companies with advanced needs",
      features: [
        "Up to 20 team members",
        "Advanced compliance templates",
        "Priority support",
        "Custom reporting",
        "API access"
      ]
    },
    {
      name: "Enterprise",
      price: "Contact us",
      description: "Custom solutions for large organizations",
      features: [
        "Unlimited team members",
        "Custom compliance frameworks",
        "24/7 dedicated support",
        "Advanced API features",
        "Custom integrations"
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-neutral-600 text-center mb-12">Choose the plan that's right for your business</p>
        
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-8 border border-neutral-200">
              <h2 className="text-2xl font-semibold mb-2">{plan.name}</h2>
              <div className="mb-4">
                <span className="text-4xl font-bold">
                  {typeof plan.price === "string" ? plan.price : `$${plan.price}`}
                </span>
                {typeof plan.price === "number" && <span className="text-neutral-600">/month</span>}
              </div>
              <p className="text-neutral-600 mb-6">{plan.description}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors">
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
