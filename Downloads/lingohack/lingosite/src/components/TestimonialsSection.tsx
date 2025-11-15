import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CEO, GlobalTech',
    content:
      'LingoSite transformed how we reach international customers. We launched in 12 languages in under a week. Game-changing.',
    rating: 5,
    avatar: 'SC',
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Founder, E-Commerce Plus',
    content:
      'The no-code approach is brilliant. My non-technical team can now manage multilingual content without developer support.',
    rating: 5,
    avatar: 'MR',
  },
  {
    name: 'Yuki Tanaka',
    role: 'Marketing Director, TechFlow',
    content:
      'Best decision we made this year. Our international traffic increased 340% in three months. The ROI is incredible.',
    rating: 5,
    avatar: 'YT',
  },
  {
    name: 'Emma Williams',
    role: 'CTO, StartupHub',
    content:
      'Fast, reliable, and beautifully designed. The CI/CD integration saved us countless hours. Highly recommend.',
    rating: 5,
    avatar: 'EW',
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-32 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-2 neo-border neo-brutal-shadow-sm bg-[var(--accent-green)] mb-6">
            <span className="text-sm font-bold letter-spacing-wider">TESTIMONIALS</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black letter-spacing-wide mb-6">
            Loved By Teams
            <br />
            Around The World
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of companies using LingoSite to expand their global reach.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="neo-border neo-brutal-shadow-lg bg-gray-50 p-8 hover:translate-x-2 hover:translate-y-2 hover:shadow-md transition-all"
            >
              <div className="flex space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-black" />
                ))}
              </div>

              <p className="text-lg leading-relaxed mb-6 text-gray-700">
                "{testimonial.content}"
              </p>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 neo-border neo-brutal-shadow-sm bg-black flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{testimonial.avatar}</span>
                </div>
                <div>
                  <div className="font-bold letter-spacing-wide">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="neo-border neo-brutal-shadow-xl bg-black text-white p-12 inline-block">
            <div className="text-5xl font-black mb-4">4.9/5</div>
            <div className="text-lg letter-spacing-wide">
              Average rating from 2,000+ reviews
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
