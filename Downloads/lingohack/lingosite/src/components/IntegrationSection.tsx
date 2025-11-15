import { Code, Database, Webhook, Cloud, Box, Layers } from 'lucide-react';

const integrations = [
  {
    icon: Code,
    name: 'GitHub',
    description: 'Auto-deploy from your repository',
  },
  {
    icon: Database,
    name: 'Databases',
    description: 'Connect to PostgreSQL, MySQL, MongoDB',
  },
  {
    icon: Webhook,
    name: 'Webhooks',
    description: 'Real-time event notifications',
  },
  {
    icon: Cloud,
    name: 'Cloud Storage',
    description: 'AWS S3, Google Cloud, Azure',
  },
  {
    icon: Box,
    name: 'CMS',
    description: 'WordPress, Contentful, Strapi',
  },
  {
    icon: Layers,
    name: 'APIs',
    description: 'RESTful & GraphQL endpoints',
  },
];

export function IntegrationSection() {
  return (
    <section className="py-32 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-2 neo-border neo-brutal-shadow-sm bg-[var(--accent-yellow)] mb-6">
            <span className="text-sm font-bold letter-spacing-wider">INTEGRATIONS</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black letter-spacing-wide mb-6">
            Works With Your
            <br />
            Favorite Tools
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Seamlessly integrate with the tools and services you already use.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.map((integration, index) => {
            const Icon = integration.icon;
            return (
              <div
                key={index}
                className="neo-border neo-brutal-shadow-lg bg-gray-50 p-8 hover:translate-x-2 hover:translate-y-2 hover:shadow-md transition-all group"
              >
                <div className="w-14 h-14 neo-border neo-brutal-shadow-sm bg-black flex items-center justify-center mb-6 group-hover:bg-[var(--accent-green)] transition-colors">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold letter-spacing-wide mb-2">
                  {integration.name}
                </h3>
                <p className="text-gray-600">{integration.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 neo-border neo-brutal-shadow-xl bg-black text-white p-12 text-center">
          <h3 className="text-3xl font-black letter-spacing-wide mb-4">
            Need a Custom Integration?
          </h3>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Our API-first architecture makes it easy to build custom integrations
            for your specific workflow.
          </p>
          <div className="inline-flex space-x-4">
            <a
              href="#"
              className="px-6 py-3 neo-border neo-brutal-shadow-md bg-white text-black font-bold letter-spacing-wide hover:translate-x-1 hover:translate-y-1 hover:shadow-sm transition-all"
            >
              View API Docs
            </a>
            <a
              href="#"
              className="px-6 py-3 neo-border neo-brutal-shadow-md bg-[var(--accent-blue)] text-black font-bold letter-spacing-wide hover:translate-x-1 hover:translate-y-1 hover:shadow-sm transition-all"
            >
              Talk to Sales
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
