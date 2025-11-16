'use client'

import { LiveProvider, LivePreview, LiveError } from 'react-live'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function ISCKONContent() {
  const searchParams = useSearchParams()
  const lang = searchParams.get('lang') || 'te'

  const englishCode = `<div className="min-h-screen bg-gray-50 font-sans">
  {/* Hero Section */}
  <div className="relative py-20 px-6 bg-blue-50 shadow-md">
    <div className="container mx-auto max-w-6xl">
      <h1 className="text-5xl lg:text-6xl font-extrabold text-black text-center mb-4 leading-tight">
        Welcome to ISCKON: The Hare Krishna Movement
      </h1>
      <p className="text-xl text-black text-center max-w-3xl mx-auto mb-8">
        Discover spiritual wisdom, find inner peace, and embark on a journey of devotion.
      </p>
      <div className="flex justify-center gap-4 flex-wrap">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:scale-[1.02] transition-all duration-300 border-2 border-black">
          Learn More About Us
        </button>
        <button className="bg-white hover:bg-gray-100 text-black font-semibold px-8 py-4 rounded-lg shadow-lg hover:scale-[1.02] transition-all duration-300 border-2 border-black">
          Visit Our Temple
        </button>
      </div>
    </div>
  </div>

  {/* Features Section */}
  <div className="py-16 px-6 bg-white">
    <div className="container mx-auto max-w-6xl">
      <h2 className="text-4xl lg:text-5xl font-bold text-black text-center mb-12">Our Spiritual Offerings</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-blue-50 p-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-black">
          <h3 className="text-2xl font-bold text-black mb-3">Daily Worship & Kirtan</h3>
          <p className="text-black">
            Participate in uplifting daily aarti ceremonies and melodious kirtans, connecting with the divine.
          </p>
        </div>
        <div className="bg-blue-50 p-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-black">
          <h3 className="text-2xl font-bold text-black mb-3">Bhakti Yoga & Philosophy</h3>
          <p className="text-black">
            Explore ancient Vedic scriptures and the timeless wisdom of Bhakti Yoga through classes and discussions.
          </p>
        </div>
        <div className="bg-blue-50 p-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-black">
          <h3 className="text-2xl font-bold text-black mb-3">Community Service (Seva)</h3>
          <p className="text-black">
            Engage in selfless service, contributing to humanitarian efforts and fostering a compassionate community.
          </p>
        </div>
      </div>
    </div>
  </div>

  {/* Gallery/Showcase Section (Lord Krishna Images) */}
  <div className="py-16 px-6 bg-yellow-50">
    <div className="container mx-auto max-w-6xl">
      <h2 className="text-4xl lg:text-5xl font-bold text-black text-center mb-12">Divine Visions of Lord Krishna</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="relative rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border border-black overflow-hidden">
          <img
            src="https://picsum.photos/600/400?random=1"
            alt="Lord Krishna playing flute image placeholder"
            className="w-full h-auto object-cover rounded-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex items-end">
            <p className="text-white text-lg font-medium">Flute of Love</p>
          </div>
        </div>
        <div className="relative rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border border-black overflow-hidden">
          <img
            src="https://picsum.photos/600/400?random=2"
            alt="Lord Krishna and Radha image placeholder"
            className="w-full h-auto object-cover rounded-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex items-end">
            <p className="text-white text-lg font-medium">Eternal Devotion</p>
          </div>
        </div>
        <div className="relative rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border border-black overflow-hidden">
          <img
            src="https://picsum.photos/600/400?random=3"
            alt="Lord Krishna with cows image placeholder"
            className="w-full h-auto object-cover rounded-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex items-end">
            <p className="text-white text-lg font-medium">Cowherd Charm</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Call-to-Action Section */}
  <div className="py-16 px-6 bg-blue-100">
    <div className="container mx-auto max-w-6xl text-center">
      <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">Join Our Global Family</h2>
      <p className="text-xl text-black max-w-3xl mx-auto mb-8">
        Embark on a meaningful journey of self-discovery, devotion, and community with ISCKON. Everyone is welcome!
      </p>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-10 py-5 rounded-lg shadow-lg hover:scale-[1.02] transition-all duration-300 border-2 border-black">
        Connect With Us
      </button>
    </div>
  </div>
</div>`

  // Telugu version (localized)
  const teluguCode = `<div className="min-h-screen bg-gray-50 font-sans">
  
  <div className="relative py-20 px-6 bg-blue-50 shadow-md">
    <div className="container mx-auto max-w-6xl">
      <h1 className="text-5xl lg:text-6xl font-extrabold text-black text-center mb-4 leading-tight">ISCKON కి స్వాగతం: హరే కృష్ణ ఉద్యమం</h1>
      <p className="text-xl text-black text-center max-w-3xl mx-auto mb-8">ఆధ్యాత్మిక జ్ఞానాన్ని కనుగొనండి, అంతర్గత శాంతిని పొందండి, మరియు భక్తి ప్రయాణంలో పాల్గొనండి.</p>
      <div className="flex justify-center gap-4 flex-wrap">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:scale-[1.02] transition-all duration-300 border-2 border-black">మా గురించి మరింత తెలుసుకోండి</button>
        <button className="bg-white hover:bg-gray-100 text-black font-semibold px-8 py-4 rounded-lg shadow-lg hover:scale-[1.02] transition-all duration-300 border-2 border-black">మా ఆలయాన్ని సందర్శించండి</button>
      </div>
    </div>
  </div>

  
  <div className="py-16 px-6 bg-white">
    <div className="container mx-auto max-w-6xl">
      <h2 className="text-4xl lg:text-5xl font-bold text-black text-center mb-12">మా ఆధ్యాత్మిక అందించేవి</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-blue-50 p-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-black">
          <h3 className="text-2xl font-bold text-black mb-3">రోజువారీ పూజ &amp; కీర్తన</h3>
          <p className="text-black">ఉత్తేజపరిచే రోజువారీ ఆరతి కార్యక్రమాలు మరియు మధురమైన కీర్తనలలో పాల్గొనండి, దైవంతో అనుసంధానం చేయండి.</p>
        </div>
        <div className="bg-blue-50 p-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-black">
          <h3 className="text-2xl font-bold text-black mb-3">భక్తి యోగ &amp; తత్వశాస్త్రం</h3>
          <p className="text-black">ప్రాచీన వేద గ్రంథాలను మరియు భక్తి యోగ యొక్క శాశ్వతమైన జ్ఞానాన్ని తరగతులు మరియు చర్చల ద్వారా అన్వేషించండి.</p>
        </div>
        <div className="bg-blue-50 p-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-black">
          <h3 className="text-2xl font-bold text-black mb-3">సామాజిక సేవ (సేవ)</h3>
          <p className="text-black">నిస్వార్థ సేవలో పాల్గొనండి, మానవతా ప్రయత్నాలకు దోహదపడుతూ మరియు కరుణగల సమాజాన్ని పెంపొందించండి.</p>
        </div>
      </div>
    </div>
  </div>

  
  <div className="py-16 px-6 bg-yellow-50">
    <div className="container mx-auto max-w-6xl">
      <h2 className="text-4xl lg:text-5xl font-bold text-black text-center mb-12">శ్రీ కృష్ణుని దివ్య దర్శనాలు</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="relative rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border border-black overflow-hidden">
          <img src="https://picsum.photos/600/400?random=1" alt="శ్రీ కృష్ణుడు వేణువు వాయిస్తున్న చిత్రం ప్లేస్‌హోల్డర్" className="w-full h-auto object-cover rounded-xl" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex items-end">
            <p className="text-white text-lg font-medium text-black">ప్రేమ వేణువు</p>
          </div>
        </div>
        <div className="relative rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border border-black overflow-hidden">
          <img src="https://picsum.photos/600/400?random=2" alt="శ్రీ కృష్ణుడు మరియు రాధ చిత్రం ప్లేస్‌హోల్డర్" className="w-full h-auto object-cover rounded-xl" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex items-end">
            <p className="text-white text-lg font-medium text-black">శాశ్వత భక్తి</p>
          </div>
        </div>
        <div className="relative rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border border-black overflow-hidden">
          <img src="https://picsum.photos/600/400?random=3" alt="శ్రీ కృష్ణుడు ఆవులతో చిత్రం ప్లేస్‌హోల్డర్" className="w-full h-auto object-cover rounded-xl" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex items-end">
            <p className="text-white text-lg font-medium text-black">గోపాలుని ఆకర్షణ</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  
  <div className="py-16 px-6 bg-blue-100">
    <div className="container mx-auto max-w-6xl text-center">
      <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">మా ప్రపంచ కుటుంబంలో చేరండి</h2>
      <p className="text-xl text-black max-w-3xl mx-auto mb-8">ISCKON తో స్వీయ-ఆవిష్కరణ, భక్తి, మరియు సామాజిక అర్థవంతమైన ప్రయాణంలో పాల్గొనండి. అందరికీ స్వాగతం!</p>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-10 py-5 rounded-lg shadow-lg hover:scale-[1.02] transition-all duration-300 border-2 border-black">మాతో అనుసంధానం కండి</button>
    </div>
  </div>
</div>`

  const jsxCode = lang === 'en' ? englishCode : teluguCode

  const wrappedCode = `function Component() {
  return (
    ${jsxCode}
  );
}

render(<Component />);`

  return (
    <div className="min-h-screen">
      <LiveProvider code={wrappedCode} noInline={true}>
        <LivePreview />
        <LiveError className="fixed bottom-4 right-4 max-w-lg p-4 bg-red-50 border-2 border-red-500 rounded text-red-800 text-sm shadow-lg" />
      </LiveProvider>
    </div>
  )
}

export default function ISCKONSitePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>}>
      <ISCKONContent />
    </Suspense>
  )
}
