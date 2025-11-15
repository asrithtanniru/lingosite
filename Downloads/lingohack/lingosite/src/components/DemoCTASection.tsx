import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowRight, Globe, Languages, Activity } from 'lucide-react';

export function DemoCTASection() {
  return (
    <section id="demo" className="py-32 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block px-4 py-2 neo-border neo-brutal-shadow-sm bg-[var(--accent-blue)]">
              <span className="text-sm font-bold letter-spacing-wider">TRY IT NOW</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black letter-spacing-wide leading-tight">
              See LingoSite
              <br />
              In Action
            </h2>

            <p className="text-xl text-gray-600 leading-relaxed">
              Experience the power of multilingual website building firsthand. Create your
              first international site in minutes, not months.
            </p>

            <ul className="space-y-4">
              {[
                'Choose from 50+ language pairs',
                'Real-time translation preview',
                'One-click deployment to production',
                'Automatic SEO optimization per language',
              ].map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 neo-border bg-black flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-[var(--accent-green)]"></div>
                  </div>
                  <span className="text-lg text-gray-700">{item}</span>
                </li>
              ))}
            </ul>

            <Link to="/dashboard">
              <Button
                size="lg"
                className="neo-border neo-brutal-shadow-lg bg-black text-white hover:bg-black hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all text-lg font-bold letter-spacing-wide px-8 py-6 h-auto group"
              >
                Try Building Your Site Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="relative">
            <div className="neo-border neo-brutal-shadow-xl bg-gray-50 p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b-4 border-black">
                <span className="font-bold letter-spacing-wide">LIVE PREVIEW</span>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 neo-border"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400 neo-border"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500 neo-border"></div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="neo-border neo-brutal-shadow-md bg-white p-6 hover:translate-x-1 hover:translate-y-1 hover:shadow-sm transition-all">
                  <div className="flex items-center space-x-3 mb-3">
                    <Globe className="w-5 h-5" />
                    <span className="font-bold">mysite.com</span>
                  </div>
                  <div className="h-2 bg-[var(--accent-green)] neo-border mb-2"></div>
                  <div className="h-2 bg-gray-200 neo-border w-3/4"></div>
                </div>

                <div className="neo-border neo-brutal-shadow-md bg-white p-6 hover:translate-x-1 hover:translate-y-1 hover:shadow-sm transition-all">
                  <div className="flex items-center space-x-3 mb-3">
                    <Languages className="w-5 h-5" />
                    <span className="font-bold">5 Languages Active</span>
                  </div>
                  <div className="flex space-x-2">
                    {['EN', 'ES', 'FR', 'DE', 'JA'].map((lang) => (
                      <div
                        key={lang}
                        className="px-3 py-1 neo-border bg-[var(--accent-yellow)] text-xs font-bold"
                      >
                        {lang}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="neo-border neo-brutal-shadow-md bg-white p-6 hover:translate-x-1 hover:translate-y-1 hover:shadow-sm transition-all">
                  <div className="flex items-center space-x-3 mb-3">
                    <Activity className="w-5 h-5" />
                    <span className="font-bold">Deploy Status</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[var(--accent-green)] rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Live & Healthy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
