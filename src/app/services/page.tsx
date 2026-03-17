import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Services — 02Ship',
  description:
    'AI adoption consulting and online courses to help you and your team harness the power of AI. From strategy to implementation, we guide you every step of the way.',
  alternates: { canonical: '/services' },
};

const consultingServices = [
  {
    icon: '🗺️',
    title: 'Strategy & Roadmap',
    description:
      'Identify high-impact use cases, set goals, and create a step-by-step plan for AI implementation.',
  },
  {
    icon: '🛡️',
    title: 'Risk & Governance',
    description:
      'Ensure compliance with data privacy laws and establish ethical frameworks for responsible AI usage.',
  },
  {
    icon: '🤝',
    title: 'Change Management',
    description:
      'Upskill employees and foster a culture that embraces AI, focusing on enhancing human potential.',
  },
  {
    icon: '⚙️',
    title: 'Technology Selection',
    description:
      'Guidance on whether to build or buy AI solutions and selecting the best platforms for your needs.',
  },
  {
    icon: '📊',
    title: 'Data Strategy',
    description:
      'Assess data maturity, quality, and structure to ensure your data is ready to support AI models.',
  },
];

export default function ServicesPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Our Services
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Whether you need hands-on consulting to adopt AI across your
              organisation or self-paced courses to build and ship your own
              ideas, we have you covered.
            </p>
          </div>
        </Container>
      </section>

      {/* AI Adoption Consulting */}
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              AI Adoption Consulting
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              We help organisations navigate the AI landscape with a
              human-centred approach — identifying the right opportunities,
              managing risks, and building a culture ready to thrive with AI.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {consultingServices.map((service) => (
              <div
                key={service.title}
                className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="text-3xl" aria-hidden="true">
                  {service.icon}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  {service.title}
                </h3>
                <p className="mt-2 text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="https://calendly.com/bobjiang"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg">Book a Consultation</Button>
            </a>
          </div>
        </Container>
      </section>

      {/* AI Online Course */}
      <section className="bg-gray-50 py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              AI Online Course
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Learn to go from idea to shipped product using AI coding tools.
              Our self-paced courses are designed for absolute beginners — no
              coding experience required.
            </p>
            <div className="mt-8">
              <a
                href="https://www.ai4all.store/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg">Browse Courses</Button>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
