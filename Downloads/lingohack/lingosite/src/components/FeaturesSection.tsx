import { useEffect, useRef, useState } from 'react';
import { Zap, Code2, Eye, Rocket } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Instant Multilingual Deployment',
    description:
      'Deploy your site in 50+ languages with a single click. Our intelligent system handles translation and localization automatically.',
  },
  {
    icon: Code2,
    title: 'No Coding Needed',
    description:
      'Build professional multilingual websites without writing a single line of code. Our visual builder does the heavy lifting.',
  },
  {
    icon: Eye,
    title: 'Live Language Preview',
    description:
      'See your website in any language in real-time. Switch between languages instantly and preview changes before publishing.',
  },
  {
    icon: Rocket,
    title: 'CI/CD Built-In',
    description:
      'Automatic deployments, version control, and rollback capabilities. Ship updates confidently with our integrated pipeline.',
  },
];

export function FeaturesSection() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            features.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...new Set([...prev, index])]);
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="py-32 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-2 neo-border neo-brutal-shadow-sm bg-[var(--accent-green)] mb-6">
            <span className="text-sm font-bold letter-spacing-wider">FEATURES</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black letter-spacing-wide mb-6">
            Everything You Need
            <br />
            To Go Global
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Built for modern teams who want to reach international audiences without the complexity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isVisible = visibleCards.includes(index);

            return (
              <div
                key={index}
                className={`p-8 neo-border neo-brutal-shadow-lg bg-white hover:translate-x-2 hover:translate-y-2 hover:shadow-md transition-all duration-300 group ${
                  isVisible ? 'animate-scale-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-14 h-14 neo-border neo-brutal-shadow-sm bg-black flex items-center justify-center mb-6 group-hover:bg-[var(--accent-blue)] transition-colors">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold letter-spacing-wide mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
