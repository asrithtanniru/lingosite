'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Globe, Code, Eye, Rocket } from 'lucide-react'

const features = [
  {
    icon: Globe,
    title: 'Instant Multilingual Deployment',
    description: 'Deploy your website in 50+ languages with a single click. Our AI-powered translation ensures accuracy and cultural nuance.',
  },
  {
    icon: Code,
    title: 'No Coding Needed',
    description: 'Build professional websites without writing a single line of code. Our intuitive interface does the heavy lifting for you.',
  },
  {
    icon: Eye,
    title: 'Live Language Preview',
    description: 'See exactly how your site looks in every language before publishing. Real-time preview ensures perfect presentation.',
  },
  {
    icon: Rocket,
    title: 'CI/CD Built-in',
    description: 'Automated deployment pipeline included. Push updates and they go live instantly across all language versions.',
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl sm:text-6xl font-heading tracking-tight">
            Everything You Need.
            <br />
            <span className="text-foreground/70">Nothing You Don't.</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">Powerful features designed to make global deployment effortless</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group">
              <CardContent className="p-8 space-y-4">
                <div className="w-16 h-16 bg-main border-2 border-border rounded-base flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-main-foreground" />
                </div>
                <h3 className="text-2xl font-heading tracking-tight">{feature.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
