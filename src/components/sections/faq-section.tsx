'use client'
'use i18n'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Minus, Mail, MessageCircle } from 'lucide-react'

const faqs = [
  {
    question: 'How many languages can I deploy to?',
    answer: 'LingoSite supports 50+ languages out of the box, including all major world languages. You can deploy to as many languages as you need with a single click.',
  },
  {
    question: 'Do I need coding experience?',
    answer: 'Not at all! LingoSite is designed for everyone. Our intuitive interface lets you build and deploy multilingual websites without writing a single line of code.',
  },
  {
    question: 'How accurate is the translation?',
    answer: 'We use advanced AI models trained on billions of multilingual documents. Our translations maintain context, cultural nuance, and technical accuracy across all supported languages.',
  },
  {
    question: 'Can I customize the translations?',
    answer: 'Yes! You have full control. Our live preview lets you review and edit translations for each language before publishing.',
  },
  {
    question: "What's included in the free tier?",
    answer: 'The free tier includes 3 sites, 10 languages per site, and 10,000 monthly views. Perfect for getting started and testing the platform.',
  },
  {
    question: 'How does CI/CD deployment work?',
    answer: 'Every change you make is automatically deployed across all language versions. Our built-in CI/CD pipeline ensures zero downtime and instant updates.',
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl sm:text-6xl font-heading tracking-tight">
            Questions?
            <br />
            <span className="text-foreground/70">We've Got Answers.</span>
          </h2>
          <p className="text-xl text-foreground/70">Everything you need to know about LingoSite</p>
        </div>

        <div className="space-y-4 mb-12">
          {faqs.map((faq, index) => (
            <Card key={index} className="overflow-hidden">
              <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full text-left">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-xl font-heading tracking-tight pr-8">{faq.question}</h3>
                    <div className="flex-shrink-0 w-8 h-8 bg-main border-2 border-border rounded-base flex items-center justify-center transition-transform duration-300">
                      {openIndex === index ? <Minus className="w-5 h-5 text-main-foreground" /> : <Plus className="w-5 h-5 text-main-foreground" />}
                    </div>
                  </div>
                  {openIndex === index && <p className="mt-4 text-foreground/70 leading-relaxed animate-fade-in">{faq.answer}</p>}
                </CardContent>
              </button>
            </Card>
          ))}
        </div>

        {/* Support Section */}
        <div className="border-2 border-border bg-background rounded-base p-8">
          <div className="text-center space-y-6">
            <h3 className="text-3xl font-heading tracking-tight">Still have questions?</h3>
            <p className="text-foreground/70 text-lg">Our support team is here to help you succeed</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg">
                <Mail className="w-5 h-5 mr-2" />
                Email Support
              </Button>
              <Button size="lg" variant="noShadow">
                <MessageCircle className="w-5 h-5 mr-2" />
                Live Chat
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
