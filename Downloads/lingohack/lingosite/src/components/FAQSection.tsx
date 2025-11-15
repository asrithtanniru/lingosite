import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

const faqs = [
  {
    question: 'How does LingoSite handle translations?',
    answer:
      'LingoSite uses advanced AI-powered translation combined with human review options. You can auto-translate your entire site instantly or manually refine translations for perfect accuracy. We support over 50 languages with context-aware translations.',
  },
  {
    question: 'Do I need coding knowledge to use LingoSite?',
    answer:
      'Not at all! LingoSite is designed for everyone. Our visual builder and intuitive interface mean you can create and manage multilingual websites without writing a single line of code. However, if you are a developer, we also offer advanced customization options.',
  },
  {
    question: 'How fast can I deploy my multilingual site?',
    answer:
      'Most users deploy their first multilingual site within minutes. Our CI/CD pipeline is built for speed, with average deployment times under 2 seconds. Changes go live instantly across all language versions.',
  },
  {
    question: 'Can I preview my site in different languages before publishing?',
    answer:
      'Yes! Our live language preview feature lets you switch between any language in real-time. You can see exactly how your site looks and functions in each language before making it public. Make edits and see changes instantly.',
  },
  {
    question: 'What happens if I need to update content?',
    answer:
      'Updates are simple and automatic. Change your content once, and LingoSite intelligently updates all language versions. You can choose to auto-translate new content or translate it manually. Version control ensures you can always roll back if needed.',
  },
  {
    question: 'Is LingoSite suitable for e-commerce sites?',
    answer:
      'Absolutely! LingoSite is perfect for e-commerce. We handle product descriptions, checkout flows, customer support pages, and more in multiple languages. Integration with popular e-commerce platforms is seamless.',
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-32 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 neo-border neo-brutal-shadow-sm bg-[var(--accent-yellow)] mb-6">
            <span className="text-sm font-bold letter-spacing-wider">FAQ</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black letter-spacing-wide mb-6">
            Questions & Answers
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about building multilingual websites with LingoSite.
          </p>
        </div>

        <div className="neo-border neo-brutal-shadow-xl bg-white p-8">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="neo-border neo-brutal-shadow-sm px-6 py-2 bg-white data-[state=open]:bg-gray-50 transition-colors"
              >
                <AccordionTrigger className="text-left font-bold text-lg letter-spacing-wide hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <a
            href="mailto:support@lingosite.com"
            className="inline-flex items-center px-6 py-3 neo-border neo-brutal-shadow-md bg-black text-white font-bold letter-spacing-wide hover:translate-x-1 hover:translate-y-1 hover:shadow-sm transition-all"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
}
