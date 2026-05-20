"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
const services = [
  {
    title: "Kidney Stone Treatment",
    copy: "Laser lithotripsy, URS, PCNL and RIRS pathways for stone pain, obstruction and recurrence prevention.",
    className: "md:col-span-2 lg:col-span-2",
  },
  {
    title: "Prostate Problems",
    copy: "Evaluation and treatment for enlarged prostate, urinary symptoms, TURP and laser-based options.",
  },
  {
    title: "Male Sexual Health",
    copy: "Confidential consultation for erectile dysfunction, infertility concerns and andrology-related care.",
  },
  {
    title: "UTI & Incontinence",
    copy: "Diagnosis-led care for repeated infections, leakage, urgency, bladder pain and urinary discomfort.",
  },
  {
    title: "Uro-Oncology",
    copy: "Evaluation and surgical guidance for kidney, bladder, prostate and testicular cancer concerns.",
  },
  {
    title: "Pediatric Urology",
    copy: "Care for urinary and genital concerns in children with family-sensitive explanations and follow-up.",
    className: "md:col-span-2 lg:col-span-3",
  },
];

const awareness = [
  {
    image: "/kidney-disease-prevention.webp",
    title: "9 ways to protect kidney health",
    copy: "Simple daily habits that support kidney function and long-term urinary wellness.",
  },
  {
    image: "/foods-to-avoid-kidney-stones.webp",
    title: "Foods to avoid during kidney stones",
    copy: "Oxalate-rich foods and diet patterns that may need moderation for stone-prone patients.",
  },
  {
    image: "/kidney-cancer-symptoms.webp",
    title: "Kidney cancer symptoms to notice",
    copy: "Awareness signs that should prompt timely specialist evaluation and imaging.",
  },
];

function SectionHeading({
  label,
  title,
  copy,
}: {
  label: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="mb-12 max-w-3xl">
      <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.12em] text-[#00B4D8]">
        {label}
      </p>
      <h2 className="text-4xl font-black tracking-tight text-[#0A2540] md:text-6xl">
        {title}
      </h2>
      {copy ? <p className="mt-5 text-lg leading-8 text-slate-600">{copy}</p> : null}
    </div>
  );
}

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-white/88 px-5 py-4 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-8">
        <a href="#" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-[#0A2540] to-[#00B4D8] text-sm font-black text-white">
            SY
          </span>
          <span>
            <strong className="block text-sm leading-tight text-[#0A2540]">
              Dr. Sunandan Yadav
            </strong>
            <small className="text-xs text-slate-500">Urologist & Andrologist</small>
          </span>
        </a>
        <nav className="ml-auto hidden items-center gap-7 text-sm font-bold text-slate-500 md:flex">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#treatments">Treatments</a>
          <a href="#stories">Reviews</a>
          <a href="#blog">Blog</a>
          <a href="#contact">Contact</a>
        </nav>
        <a
          href="#appointment"
          className="hidden rounded-2xl bg-[#00B4D8] px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-cyan-500/25 md:inline-flex"
        >
          Book Appointment
        </a>
      </div>
    </header>
  );
}

export function TrustBar() {
  const items = [
    ["MBBS, MS, MCh", "Structured surgical training"],
    ["Pratap Nagar", "Sector 22, Jaipur"],
    ["NRI Colony", "Haldighati Marg location"],
    ["Patient-first", "Clear, approachable guidance"],
  ];

  return (
    <section className="grid border-y border-slate-200 bg-slate-100 md:grid-cols-4">
      {items.map(([title, copy]) => (
        <div key={title} className="border-slate-200 bg-white p-8 md:border-r">
          <strong className="block text-2xl text-[#0A2540]">{title}</strong>
          <span className="mt-2 block text-sm text-slate-500">{copy}</span>
        </div>
      ))}
    </section>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="Core services"
          title="Focused urology care with modern procedure pathways."
          copy="From kidney stone emergencies to long-term prostate and men's health concerns, each service is designed around diagnosis, treatment clarity, and faster recovery."
        />
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <article
              key={service.title}
              className={`rounded-3xl border border-slate-100 bg-white p-7 shadow-xl shadow-slate-900/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(6,182,212,0.15)] min-w-[85vw] md:min-w-0 snap-center shrink-0 ${service.className || ""}`}
            >
              <div className="mb-8 grid h-12 w-12 place-items-center rounded-2xl bg-cyan-50 text-lg font-black text-[#00B4D8]">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="text-2xl font-black text-[#0A2540]">{service.title}</h3>
              <p className="mt-4 leading-7 text-slate-600">{service.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="bg-[#F8F9FA] px-6 py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-[0.8fr_1fr]">
        <div className="relative">
          <div className="absolute inset-5 rounded-3xl border-2 border-[#00B4D8]" />
          <Image
            src="/dr-sunandan-about-profile.webp"
            alt="Dr. Sunandan Yadav"
            width={1254}
            height={1254}
            className="relative aspect-[0.86] rounded-3xl object-cover shadow-2xl shadow-slate-900/12"
          />
        </div>
        <div>
          <SectionHeading
            label="About doctor"
            title="Jaipur-trained specialist care, explained in language patients can trust."
            copy="Dr. Sunandan Yadav is a Consultant Urologist and Andrologist based in Jaipur, Rajasthan, with focused training in urology, minimally invasive surgery and patient-first clinical care."
          />
          <div className="grid gap-4">
            {[
              ["2013", "MBBS, Rajasthan University of Health Sciences (SMS), Jaipur"],
              ["2018", "MS General Surgery, SMS Jaipur"],
              ["2022", "MCh Urology, Government Medical College Kota"],
            ].map(([year, copy]) => (
              <div key={year} className="grid gap-3 rounded-2xl border-l-4 border-[#00B4D8] bg-white p-5 shadow-sm md:grid-cols-[80px_1fr]">
                <strong className="text-[#0A2540]">{year}</strong>
                <p className="text-slate-600">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const treatmentTabs = [
  {
    id: "laser",
    title: "Laser Lithotripsy & RIRS",
    subtitle: "Advanced stone removal",
    image: "/laparoscopic-surgery-ot.webp",
    description: "Patients are guided through symptoms, scans, treatment choices, expected recovery and follow-up prevention so care feels less uncertain.",
    features: ["No external cuts", "Faster recovery", "Same-day discharge"]
  },
  {
    id: "laparoscopy",
    title: "Laparoscopic Uro-Oncology",
    subtitle: "Precision cancer surgery",
    image: "/kidney-anatomy.webp",
    description: "Minimally invasive keyhole procedures for kidney and bladder tumors, maximizing oncological safety while minimizing post-operative pain and hospital stay.",
    features: ["High precision", "Minimal blood loss", "Oncological safety"]
  },
  {
    id: "prostate",
    title: "Prostate Laser Surgery",
    subtitle: "Enlarged prostate care",
    image: "/prostate-care-doctor.webp",
    description: "State-of-the-art laser treatments like HoLEP and ThuLEP for enlarged prostate (BPH), offering immediate relief from urinary symptoms.",
    features: ["Catheter-free quickly", "Preserves continence", "Safe for cardiac patients"]
  }
];

export function TreatmentsSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="treatments" className="px-6 py-24 bg-slate-50">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="Treatment pathways"
          title="Procedure clarity before the patient enters the OT."
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-[320px_1fr] items-start">
          <div className="flex overflow-x-auto whitespace-nowrap scrollbar-hide gap-3 pb-4 w-full md:flex-col md:whitespace-normal md:pb-0">
            {treatmentTabs.map((tab, idx) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(idx)}
                className={`text-left p-6 rounded-3xl transition-all duration-300 border-2 shrink-0 snap-center min-w-[240px] md:min-w-0 ${activeTab === idx ? "border-[#00B4D8] bg-white shadow-xl shadow-cyan-900/5" : "border-transparent hover:bg-white hover:shadow-md"}`}
              >
                <h4 className={`text-xl font-black ${activeTab === idx ? "text-[#0A2540]" : "text-slate-500"}`}>{tab.title}</h4>
                <span className={`text-sm mt-1 block ${activeTab === idx ? "text-[#00B4D8]" : "text-slate-400"}`}>{tab.subtitle}</span>
              </button>
            ))}
          </div>
          
          <div className="relative overflow-hidden rounded-3xl bg-[#0A2540] shadow-2xl shadow-slate-900/20 min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="grid md:grid-cols-2 h-full"
              >
                <div className="relative h-64 md:h-full">
                  <Image
                    src={treatmentTabs[activeTab].image}
                    alt={treatmentTabs[activeTab].title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#0A2540]" />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <h3 className="text-3xl font-black text-white">{treatmentTabs[activeTab].title}</h3>
                  <p className="mt-5 text-lg leading-8 text-white/72">
                    {treatmentTabs[activeTab].description}
                  </p>
                  <div className="mt-8 grid gap-4">
                    {treatmentTabs[activeTab].features.map((item) => (
                      <div key={item} className="flex items-center gap-3 text-sm font-bold text-white/90">
                        <div className="h-2 w-2 rounded-full bg-[#00B4D8]" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AwarenessSection() {
  return (
    <section id="blog" className="bg-[#F8F9FA] px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="Awareness hub"
          title="Useful reading for patients before and after consultation."
        />
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 scrollbar-hide md:grid md:grid-cols-3">
          {awareness.map((post) => (
            <article key={post.title} className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-900/6 min-w-[85vw] md:min-w-0 snap-center shrink-0">
              <Image
                src={post.image}
                alt={post.title}
                width={1300}
                height={1300}
                className="aspect-[1.25] object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-black text-[#0A2540]">{post.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{post.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AppointmentSection() {
  return (
    <section id="appointment" className="bg-[#0A2540] px-6 py-24 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.85fr_1fr]">
        <div>
          <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.12em] text-[#00B4D8]">
            Book consultation
          </p>
          <h2 className="text-4xl font-black tracking-tight md:text-6xl">
            Start with a focused urology consultation.
          </h2>
          <p className="mt-5 text-lg leading-8 text-white/72">
            Share your symptoms and preferred time. The clinic team can confirm availability and the right consultation slot.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="tel:+919001700762" className="rounded-2xl border border-white/20 px-5 py-3 font-extrabold">
              +91 90017 00762
            </a>
            <a href="https://wa.me/919001700762" className="rounded-2xl bg-[#00B4D8] px-5 py-3 font-extrabold">
              WhatsApp
            </a>
          </div>
        </div>
        <form className="grid gap-4 rounded-3xl bg-white p-7 text-[#0A2540] shadow-2xl">
          <input className="h-14 rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none ring-cyan-500/20 focus:ring-4" placeholder="Patient name" />
          <input className="h-14 rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none ring-cyan-500/20 focus:ring-4" placeholder="+91 phone number" />
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <strong>Pratap Nagar clinic</strong>
            <small className="mt-1 block text-slate-500">Haldighati Marg, Sector 22</small>
          </div>
          <button type="button" className="h-14 rounded-2xl bg-[#00B4D8] font-extrabold text-white shadow-lg shadow-cyan-500/25">
            Request Appointment
          </button>
        </form>
      </div>
    </section>
  );
}

export function ContactSection() {
  const [mapInteractive, setMapInteractive] = useState(false);

  return (
    <section id="contact" className="bg-[#F8F9FA] px-6 py-24">
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[0.85fr_1fr]">
        <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-900/5">
          <h2 className="text-4xl font-black text-[#0A2540]">Clinic location</h2>
          <p className="mt-5 leading-8 text-slate-600">
            <strong className="text-[#0A2540]">Dr. Sunandan Yadav</strong>
            <br />
            Infront of, 22-A-18, 22-A-11, Haldighati Marg, Sector 22, NRI Colony, Pratap Nagar, Jaipur, Rajasthan 302033
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="https://www.instagram.com/drsunandan_urologist" className="rounded-2xl bg-[#00B4D8] px-5 py-3 font-extrabold text-white">
              Instagram
            </a>
            <a href="https://www.facebook.com/sunandan.yadav/" className="rounded-2xl bg-[#0A2540] px-5 py-3 font-extrabold text-white">
              Facebook
            </a>
          </div>
        </div>
        <div 
          className="relative overflow-hidden rounded-3xl shadow-xl shadow-slate-900/10 min-h-[320px] group"
          onClick={() => setMapInteractive(true)}
          onMouseLeave={() => setMapInteractive(false)}
        >
          {!mapInteractive && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/5 md:hidden">
              <span className="rounded-full bg-white/90 px-4 py-2 text-sm font-bold shadow-lg backdrop-blur">Tap to interact</span>
            </div>
          )}
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.841551466085!2d75.8118029!3d26.8131375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396dc982705cc75f%3A0xe54e195724225381!2sDr.%20Sunandan%20Yadav!5e0!3m2!1sen!2sin!4v1716210000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className={`h-full w-full grayscale-[40%] contrast-125 transition-all duration-700 hover:grayscale-0 ${!mapInteractive ? 'pointer-events-none md:pointer-events-auto' : ''}`}
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#061827] px-6 py-10 text-white/70">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <strong className="text-white">Dr. Sunandan Yadav</strong>
          <p className="mt-1">Consultant Urologist & Andrologist in Jaipur.</p>
        </div>
        <p className="max-w-md text-sm">Please verify current OPD timings and phone numbers with the clinic before visiting.</p>
      </div>
    </footer>
  );
}
