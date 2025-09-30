import React from 'react';
import { motion } from 'framer-motion';

interface EnterScreenProps {
  onEnter: () => void;
}

export function EnterScreen({ onEnter }: EnterScreenProps) {
  const [exiting, setExiting] = React.useState(false);

  const scrollToFeatures = () => {
    const el = document.getElementById('features');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // also focus for accessibility
      el.setAttribute('tabindex', '-1');
      // small timeout to focus after scroll
      setTimeout(() => el.focus(), 500);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: 'linear-gradient(180deg,#e6fbfe 0%, #eaf8fb 45%, #ffffff 100%)' }}>
      {/* Large blurred decorative blobs for the hero */}
      <motion.div
        initial={{ opacity: 0.9 }}
        animate={{ opacity: 0.95 }}
        transition={{ duration: 1 }}
        className="absolute -right-40 -top-32 w-[720px] h-[520px] rounded-full blur-[80px]"
        style={{ background: 'radial-gradient(circle at 30% 30%, rgba(18,140,143,0.14), rgba(18,140,143,0.06) 40%, transparent 60%)' }}
      />

      <motion.div
        initial={{ opacity: 0.9 }}
        animate={{ opacity: 0.95 }}
        transition={{ duration: 1.2 }}
        className="absolute -left-40 top-20 w-[560px] h-[420px] rounded-full blur-[72px]"
        style={{ background: 'radial-gradient(circle at 60% 40%, rgba(200,240,239,0.18), rgba(200,240,239,0.06) 40%, transparent 60%)' }}
      />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <motion.div className="max-w-5xl w-full text-center py-28 px-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-[#042b2d] leading-tight">Bringing sense to water</h1>

          <div className="flex items-center justify-center mt-6">
            <div className="w-24 h-0.5 bg-[#9feff3] rounded-full mr-4 opacity-80" />
            <p className="text-base sm:text-lg text-[#064046] max-w-2xl">Hydrometrics India visualizes water quality across lakes, rivers and groundwater — clear, minimal and action-oriented.</p>
            <div className="w-24 h-0.5 bg-[#9feff3] rounded-full ml-4 opacity-80" />
          </div>

          <motion.div className="mt-10 flex items-center justify-center gap-6"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.6 }}
          >
            <motion.button
              onClick={() => {
                if (exiting) return;
                setExiting(true);
                // call onEnter after exit animation finishes
                setTimeout(() => onEnter(), 600);
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-[#06cbd2] text-[#012323] font-semibold shadow-2xl"
              disabled={exiting}
            >
              Enter Dashboard
            </motion.button>

            <button className="inline-flex items-center px-4 py-3 rounded-full text-sm text-[#064046] bg-white/70" onClick={(e)=>{ e.preventDefault(); scrollToFeatures(); }}>Learn more</button>
          </motion.div>
        </motion.div>
      </div>
      {/* Features section - will scroll to this when Learn more is clicked */}
  <section id="features" className="relative z-10 bg-transparent py-20 px-6">
        <motion.div className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-[#042b2d] text-center mb-6">What Hydrometrics does</h2>
          <p className="text-center text-[#064046] max-w-3xl mx-auto mb-10">Explore powerful features that help monitor and act on water contamination across regions.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Interactive Map', desc: 'Dark-themed Leaflet map with contamination markers and clustering.' },
              { title: 'Smart Filtering', desc: 'Search and filter by location, type, and contamination level.' },
              { title: 'Charts & Insights', desc: 'Visualize heavy metal concentrations and trends with charts.' },
              { title: 'Responsive', desc: 'Designed for desktop and mobile with accessible controls.' },
              { title: 'Smooth Animations', desc: 'Framer Motion for crisp, performant UI transitions.' },
              { title: 'Export & Reports', desc: 'Export data and generate reports for field teams.' }
            ].map((f, i) => (
              <motion.div key={f.title} className="p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/10"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: 0.06 * i, duration: 0.5 }}
              >
                <h3 className="text-lg font-semibold text-[#042b2d] mb-2">{f.title}</h3>
                <p className="text-sm text-[#064046]/90">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <footer className="relative z-10 text-center py-8 text-sm text-[#064046]/70">
        © {new Date().getFullYear()} Hydrometrics India. All rights reserved.
      </footer>
    </div>
  );
}

export default EnterScreen;
