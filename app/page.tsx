"use client";

import React, { useState } from "react";

// Types
interface Service {
  id: number;
  title: string;
  description: string;
  duration: string;
  price: string;
  icon: React.ReactNode;
}

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  detail: string;
}

// Services (slightly personalized)
const services: Service[] = [
  {
    id: 1,
    title: "Signature Hair Color & Care",
    description: "Dimensional, skin-flattering color and precision cutting. I work slowly and thoughtfully, always prioritizing the health and movement of your hair.",
    duration: "90–150 min",
    price: "from $145",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 18.75h12A2.25 2.25 0 0020.25 16.5V7.5A2.25 2.25 0 0018 5.25H6A2.25 2.25 0 003.75 7.5v9A2.25 2.25 0 006 18.75z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Restorative Facial Rituals",
    description: "Custom facials using beautiful botanical and clinical actives. My focus is always on deep relaxation and visible, lasting improvement in your skin.",
    duration: "60–90 min",
    price: "from $135",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Thoughtful Manicures & Pedicures",
    description: "Clean, precise nail care with nourishing formulas. I believe in treating your hands and feet with the same attention I give to the face.",
    duration: "45–75 min",
    price: "from $68",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0020.25 6v1.5m0 9.75V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Bridal & Special Occasion Beauty",
    description: "Timeless, light-filled hair and makeup for the days that matter most. I offer trials and calm, unhurried on-site services.",
    duration: "90–180 min",
    price: "from $185",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    id: 5,
    title: "Brow Design & Lash Lifts",
    description: "Meticulous, natural brow shaping and lifting. I never chase trends — only what flatters your individual face and features.",
    duration: "45–60 min",
    price: "from $78",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    id: 6,
    title: "Scalp Therapy & Wellness Rituals",
    description: "Deeply nourishing scalp treatments and restorative experiences that calm the nervous system while caring for your hair and skin.",
    duration: "75–120 min",
    price: "from $155",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
];

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "Kelly took the time to really understand what I wanted. My color has never looked more natural or beautiful. I left feeling completely myself.",
    name: "Elena M.",
    detail: "Hair Color + Cut • Client since 2021",
  },
  {
    id: 2,
    quote: "The facial was unlike anything I’ve experienced. I felt deeply relaxed the entire time, and my skin looked radiant for days afterward.",
    name: "Priya S.",
    detail: "Restorative Facial • Client since 2023",
  },
  {
    id: 3,
    quote: "Kelly did my wedding hair and makeup. She was calm, kind, and made me look like the best version of myself. I felt beautiful and at peace all day.",
    name: "Claire D.",
    detail: "Bridal Beauty • 2024",
  },
];

// Main Component
export default function CosmetologyByKel() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle nav scroll effect
  const [navScrolled, setNavScrolled] = useState(false);

  // External booking link (Vagaro widget)
  const BOOKING_URL = "https://www.vagaro.com//Users/BusinessWidget.aspx?enc=MMLjhIwJMcwFQhXLL7ifVGlhN5bqZRMl7XbmjGBhrPv/L/RE3qw3XbDy2JQKZT3OIo/dDi9bjeb690+wW6uPF+HSh6hQ0ar0+t6tTHT5JfwizahBycyj9X4s14FQXqcfni+F49eoD7PpkJNtx98/ew32u13upXrJ9G6z9eNH3H6QrQSAxtKbLvhytUlpgf/DWt7H/S6gndcBCD+L/t0W81kd0D/+eSDZMnd8koyMhjUlFoz1aGtK0KQDLq2yx58X0O1NGBBISNIxK8g5TjVeWoJI0oyCokpW38Gcf2ikxRX/WVPU6omI/Q7DViUr/o7WmUAfLiqJrheMAU3++tuQ8Y8O4+/ytBAb2zjZMJGqh7mFjxJtvgicwm/y9SHMtw9VcClLUpD63IpNxSTQBnoeNcV3VcEmiSHftl+/goUbwb9nB6zTydxHmLygtJisxxui";

  React.useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition - bodyRect - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--on-surface)] overflow-x-hidden">
      {/* Elegant Fixed Navigation */}
      <nav className={`nav ${navScrolled ? "nav-scrolled" : ""}`}>
        <div className="container nav-content">
          <a href="#top" className="logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            Cosmetology by Kel
          </a>

          {/* Desktop Navigation */}
          <div className="nav-links">
            <a href="#services" onClick={() => scrollToSection("services")}>Services</a>
            <a href="#approach" onClick={() => scrollToSection("approach")}>My Approach</a>
            <a href="#about" onClick={() => scrollToSection("about")}>About Me</a>
            <a href="#studio" onClick={() => scrollToSection("studio")}>In the Studio</a>
            <a href="#voices" onClick={() => scrollToSection("voices")}>Notes from Clients</a>
            <a 
              href={BOOKING_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-primary nav-cta !py-2.5 !px-6 text-sm"
            >
              Book with Me
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="mobile-menu-btn"
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
          <div className="flex flex-col gap-1 text-[15px]">
            <a href="#services" onClick={() => scrollToSection("services")} className="py-3 border-b border-[var(--surface-container-high)]">Services</a>
            <a href="#approach" onClick={() => scrollToSection("approach")} className="py-3 border-b border-[var(--surface-container-high)]">My Approach</a>
            <a href="#about" onClick={() => scrollToSection("about")} className="py-3 border-b border-[var(--surface-container-high)]">About Me</a>
            <a href="#studio" onClick={() => scrollToSection("studio")} className="py-3 border-b border-[var(--surface-container-high)]">In the Studio</a>
            <a href="#voices" onClick={() => scrollToSection("voices")} className="py-3 border-b border-[var(--surface-container-high)]">Notes from Clients</a>
            <a 
              href={BOOKING_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-primary mt-4 w-full justify-center"
            >
              Book with Me
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="top" className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-eyebrow">Mason, Michigan</div>
            <h1>
              Thoughtful<br />cosmetology.
            </h1>
            <p className="lede body-lg">
              I’m Kelly Frederick. I offer personal, unhurried cosmetology in a quiet studio 
              where every appointment is shaped around how you want to feel — not just how you want to look.
            </p>
            <div className="hero-actions">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                Book with Me
              </a>
              <button 
                onClick={() => scrollToSection("services")} 
                className="btn btn-secondary btn-lg"
              >
                See Services
              </button>
            </div>
            <div className="mt-8 flex items-center gap-3 text-sm text-[var(--on-surface-variant)]">
              <div className="flex -space-x-1">
                <div className="w-6 h-6 rounded-full bg-[#d8dbd6] ring-2 ring-[var(--surface)]" />
                <div className="w-6 h-6 rounded-full bg-[#e6e9e4] ring-2 ring-[var(--surface)]" />
                <div className="w-6 h-6 rounded-full bg-[#f1f4f0] ring-2 ring-[var(--surface)]" />
              </div>
              <span>Limited appointments available this month</span>
            </div>
          </div>
        </div>

        {/* Hero visual */}
        <div className="hero-visual">
          <img 
            src="https://placehold.co/1200x800/f7faf5/466252?text=Hero+Placeholder" 
            alt="Placeholder image" 
            className="w-full h-auto object-cover"
          />
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="py-5 border-b border-[var(--surface-container-high)] bg-white/70">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-xs tracking-[0.08em] uppercase text-[var(--on-surface-variant)] font-medium">
            <div>Tons of happy customers</div>
            <div>By appointment only</div>
            <div>Inside Hair &amp; Company on Ash</div>
            <div>Thoughtful &amp; unhurried</div>
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <section id="services" className="section">
        <div className="container">
          <div className="max-w-xl mb-12">
            <div className="label-sm text-[var(--secondary)] mb-3">Services</div>
            <h2>Work we do together.</h2>
            <p className="mt-4 body-lg max-w-md text-[var(--on-surface-variant)]">
              Every service is personal. I take the time to understand your hair, your skin, and how you want to feel in your body.
            </p>
          </div>

          <div className="services-grid">
            {services.map((service) => (
              <div key={service.id} className="service-card group">
                <div className="icon">{service.icon}</div>
                <h3 className="font-medium tracking-tight">{service.title}</h3>
                <p className="text-[15px] text-[var(--on-surface-variant)] leading-relaxed">
                  {service.description}
                </p>
                <div className="flex items-baseline justify-between mt-auto pt-4 border-t border-[var(--surface-container)]">
                  <div>
                    <span className="text-xs tracking-[0.06em] uppercase text-[var(--on-surface-variant)]">Duration</span>
                    <div className="font-medium text-sm">{service.duration}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs tracking-[0.06em] uppercase text-[var(--on-surface-variant)]">Starting at</span>
                    <div className="font-semibold text-[var(--primary)]">{service.price}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              Book an appointment
            </a>
          </div>
        </div>
      </section>

      {/* MY APPROACH (personal) */}
      <section id="approach" className="section bg-white border-y border-[var(--surface-container-high)]">
        <div className="container">
          <div className="max-w-2xl mb-14">
            <div className="label-sm text-[var(--secondary)] mb-3">My Approach</div>
            <h2>I work slowly.<br />I listen first.</h2>
          </div>

          <div className="philosophy-grid">
            {[
              {
                number: "01",
                title: "Your story matters more than trends.",
                text: "Before I ever pick up a brush or bowl, I want to know how you live, what you love, and how you want to feel when you look in the mirror.",
              },
              {
                number: "02",
                title: "Less, but exceptional.",
                text: "I use fewer, better products. Everything in my studio has been chosen because it is genuinely effective and kind to your body over time.",
              },
              {
                number: "03",
                title: "Time is a form of care.",
                text: "Appointments are never rushed. I build space into every day so we can move at the pace your body and spirit actually need.",
              },
            ].map((item, idx) => (
              <div key={idx} className="philosophy-item">
                <div className="number">{item.number}</div>
                <h3>{item.title}</h3>
                <p className="text-[15px] leading-relaxed text-[var(--on-surface-variant)]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT KELLY FREDERICK — Personal Section */}
      <section id="about" className="section">
        <div className="container">
          <div className="max-w-2xl mb-10">
            <div className="label-sm text-[var(--secondary)] mb-3">Hello</div>
            <h2>I’m Kelly Frederick.</h2>
          </div>

          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            {/* Left column — text */}
            <div className="lg:col-span-3 space-y-6 text-[15px] leading-relaxed text-[var(--on-surface-variant)]">
              <p>
                I’m a cosmetologist who believes deeply in presence and listening. What began as a love for color and texture has become a practice centered on care — helping people feel more like themselves.
              </p>
              <p>
                I work inside the beautiful Hair &amp; Company on Ash studio in Mason, Michigan. It’s a welcoming space with no rushing between chairs and no one-size-fits-all menus. Every person who sits with me receives my full attention for the length of their appointment.
              </p>
              <p>
                My work is especially suited to people who want to look like themselves — only more rested, more clear, more at home in their own skin. Many of my clients have been coming to me for years. Some travel from other cities because they value the unhurried, personal nature of the experience.
              </p>

              <div className="pt-4 text-sm text-[var(--on-surface)]">
                <div className="font-semibold mb-1">A few things I believe:</div>
                <ul className="space-y-1 text-[var(--on-surface-variant)]">
                  <li>• Beauty should feel like relief, not pressure</li>
                  <li>• The best work is invisible — you simply look like yourself, only better</li>
                  <li>• Touch is powerful. It should always be respectful and intentional</li>
                </ul>
              </div>
            </div>

            {/* Right column — two images */}
            <div className="lg:col-span-2 space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-[var(--shadow-card)]">
                <img 
                  src="https://placehold.co/600x750/ecefea/466252?text=Placeholder+1" 
                  alt="Placeholder image" 
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-[var(--shadow-card)]">
                <img 
                  src="https://placehold.co/600x750/f1f4f0/466252?text=Placeholder+2" 
                  alt="Placeholder image" 
                  className="w-full h-auto object-cover"
                />
              </div>
              <p className="text-xs text-[var(--on-surface-variant)] text-center italic pt-1">
                Request received. I’ll be in touch soon.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* IN THE STUDIO — GALLERY */}
      <section id="studio" className="section bg-white border-y border-[var(--surface-container-high)]">
        <div className="container">
          <div className="max-w-xl mb-10">
            <div className="label-sm text-[var(--secondary)] mb-3">The Space</div>
            <h2>In the studio.</h2>
            <p className="mt-3 body-lg text-[var(--on-surface-variant)]">
              A calm, light-filled room designed for quiet and focus. Every detail exists so you can arrive fully and leave feeling more like yourself.
            </p>
          </div>

          <div className="gallery-grid">
            <div className="gallery-item">
              <img src="https://placehold.co/600x450/ecefea/466252?text=Gallery+1" alt="Placeholder image" />
            </div>
            <div className="gallery-item tall">
              <img src="https://placehold.co/600x900/f1f4f0/466252?text=Gallery+2" alt="Placeholder image" />
            </div>
            <div className="gallery-item">
              <img src="https://placehold.co/600x450/e0e3df/466252?text=Gallery+3" alt="Placeholder image" />
            </div>
            <div className="gallery-item">
              <img src="https://placehold.co/600x450/f7faf5/466252?text=Gallery+4" alt="Placeholder image" />
            </div>
            <div className="gallery-item">
              <img src="https://placehold.co/600x450/ecefea/466252?text=Gallery+5" alt="Placeholder image" />
            </div>
            <div className="gallery-item tall">
              <img src="https://placehold.co/600x900/f1f4f0/466252?text=Gallery+6" alt="Placeholder image" />
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-[var(--on-surface-variant)]">Private studio in Southeast Portland • By appointment only</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="voices" className="section">
        <div className="container">
          <div className="max-w-xl mb-12">
            <div className="label-sm text-[var(--secondary)] mb-3">Notes from Clients</div>
            <h2>What people say after working with me.</h2>
          </div>

          <div className="testimonial-grid">
            {testimonials.map((t) => (
              <div key={t.id} className="testimonial">
                <div className="quote">“{t.quote}”</div>
                <div className="author">
                  <div className="author-avatar" />
                  <div>
                    <div className="author-name">{t.name}</div>
                    <div className="author-detail">{t.detail}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section bg-[var(--primary)] text-white">
        <div className="container text-center">
          <div className="max-w-lg mx-auto">
            <h2 className="text-white mb-6">Would you like to work together?</h2>
            <p className="text-[17px] opacity-90 mb-9 leading-relaxed">
              I keep my schedule intentionally small so every appointment receives my full presence.<br />I would be honored to care for you.
            </p>
            <a 
              href={BOOKING_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn !bg-white !text-[var(--primary)] hover:!bg-[#f7faf5] hover:!text-[var(--primary)] px-12 py-4 text-base font-semibold"
            >
              Book Time with Me
            </a>
            <div className="mt-8 text-sm opacity-80">Or reach the studio at <a href="tel:+15172440700" className="underline hover:no-underline">(517) 244-0700</a></div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-y-12">
            <div>
              <div className="logo text-white text-2xl tracking-tight mb-4">Cosmetology by Kel</div>
              <p className="max-w-xs text-sm opacity-70">Kelly Frederick • Personal cosmetology in Mason, Michigan.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 text-sm">
              <div>
                <div className="font-semibold tracking-wider mb-3 opacity-80">STUDIO</div>
                <div className="space-y-1.5 opacity-90">
                  <div>Inside Hair &amp; Company on Ash</div>
                  <div>700 W. Ash St, Mason, MI 48854</div>
                </div>
              </div>
              <div>
                <div className="font-semibold tracking-wider mb-3 opacity-80">HOURS</div>
                <div className="space-y-1.5 opacity-90">
                  <div>Tue–Fri • 9am–6pm</div>
                  <div>Sat • 9am–4pm</div>
                  <div>Closed Sun &amp; Mon</div>
                </div>
              </div>
              <div>
                <div className="font-semibold tracking-wider mb-3 opacity-80">CONNECT</div>
                <div className="space-y-1.5 opacity-90">
                  <a href="mailto:kel@cosmetologybykel.com">kel@cosmetologybykel.com</a><br />
                  <a href="tel:+15172440700">(517) 244-0700</a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/20 text-xs opacity-60 flex flex-col md:flex-row gap-y-2 justify-between">
            <div>© {new Date().getFullYear()} Kelly Frederick. All rights held with care.</div>
            <div className="flex gap-6">
              <a href="#">Instagram</a>
              <a href="#">Gift Certificates</a>
              <a href="#">For Brides</a>
            </div>
          </div>
        </div>
      </footer>

      {/* External booking is handled via direct Vagaro links */}
    </div>
  );
}
