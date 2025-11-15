import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowRight, Sparkles, Globe, Zap, Languages, TrendingUp } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-20 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-32 h-32 neo-border neo-brutal-shadow-lg bg-[var(--accent-yellow)] rotate-12 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 neo-border neo-brutal-shadow-md bg-[var(--accent-green)] -rotate-6"></div>
        <div className="absolute bottom-40 left-1/4 w-20 h-20 neo-border neo-brutal-shadow-sm bg-[var(--accent-blue)] rotate-45"></div>
        <div className="absolute bottom-60 right-1/3 w-16 h-16 neo-border bg-white"></div>
      </div>

      <div className="max-w-7xl w-full">
        <div className="text-center space-y-8 animate-fade-in">
          <div className="inline-flex items-center space-x-2 px-4 py-2 neo-border neo-brutal-shadow-sm bg-[var(--accent-yellow)] animate-bounce">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-bold letter-spacing-wide">
              MULTILINGUAL MADE SIMPLE
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black letter-spacing-wide leading-[1.1] tracking-tight">
            Build Websites
            <br />
            <span className="inline-block mt-2">In Every Language</span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Deploy multilingual websites instantly with LingoSite. No coding required,
            just pure global reach. Transform your content into any language with
            live preview and CI/CD built-in.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link to="/dashboard">
              <Button
                size="lg"
                className="neo-border neo-brutal-shadow-lg bg-black text-white hover:bg-black hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all text-lg font-bold letter-spacing-wide px-8 py-6 h-auto group"
              >
                Start Building Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href="#demo">
              <Button
                size="lg"
                variant="outline"
                className="neo-border neo-brutal-shadow-lg bg-white hover:bg-white hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all text-lg font-bold letter-spacing-wide px-8 py-6 h-auto"
              >
                Watch Demo
              </Button>
            </a>
          </div>

          <div className="pt-12 flex flex-wrap justify-center gap-6 max-w-2xl mx-auto">
            {[
              { icon: Globe, text: '50+ Languages' },
              { icon: Zap, text: 'Deploy in 2s' },
              { icon: Languages, text: 'Live Preview' },
              { icon: TrendingUp, text: 'Auto Scale' },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="flex items-center space-x-2 px-4 py-2 neo-border neo-brutal-shadow-sm bg-white hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-bold text-sm letter-spacing-wide">{feature.text}</span>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-16 max-w-4xl mx-auto">
            {[
              { number: '50+', label: 'Languages' },
              { number: '10K+', label: 'Sites Built' },
              { number: '99.9%', label: 'Uptime' },
              { number: '< 2s', label: 'Deploy Time' },
            ].map((stat, index) => (
              <div
                key={index}
                className="p-6 neo-border neo-brutal-shadow-md bg-white hover:translate-x-1 hover:translate-y-1 hover:shadow-sm transition-all"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-3xl font-black letter-spacing-wide">{stat.number}</div>
                <div className="text-sm font-medium text-gray-600 mt-1 letter-spacing-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-16 max-w-5xl mx-auto">
            <div className="neo-border neo-brutal-shadow-xl bg-gray-50 p-8">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="neo-border neo-brutal-shadow-md bg-white p-4 transform rotate-1 hover:rotate-0 transition-transform">
                  <div className="text-xs font-bold text-gray-500 mb-2">ENGLISH</div>
                  <div className="h-2 bg-black mb-1"></div>
                  <div className="h-2 bg-gray-300 w-3/4"></div>
                </div>
                <div className="neo-border neo-brutal-shadow-md bg-white p-4 transform -rotate-1 hover:rotate-0 transition-transform">
                  <div className="text-xs font-bold text-gray-500 mb-2">ESPAÑOL</div>
                  <div className="h-2 bg-black mb-1"></div>
                  <div className="h-2 bg-gray-300 w-2/3"></div>
                </div>
                <div className="neo-border neo-brutal-shadow-md bg-white p-4 transform rotate-2 hover:rotate-0 transition-transform">
                  <div className="text-xs font-bold text-gray-500 mb-2">FRANÇAIS</div>
                  <div className="h-2 bg-black mb-1"></div>
                  <div className="h-2 bg-gray-300 w-4/5"></div>
                </div>
              </div>
              <div className="text-center mt-6">
                <span className="text-sm font-bold letter-spacing-wide">
                  → INSTANT TRANSLATION →
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
