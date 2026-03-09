'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const services = [
  {
    title: 'Awarness Scaling',
    description:
      'we launch globally accessible, trackable campaigns that enables KOLs worldidee to participate, leveraging our hybrid AI system to significantly expand brand awarness',
    highlight: true,
  },
  {
    title: 'Clipping',
    description:
      'We execute high-impact clipping campaigns using short form video contentacross platforms such as TilTok, X, & YouTube to maximise reach and audience engagement.',
  },
  {
    title: 'Sustainable -\nDistribution',
    description:
      'We design tailored campaigns using advanced data, metrics & niche targeting, enhanced by our proprietry KOL Tier system to deliver more effective & Accurate Distribution.',
  },
  {
    title: 'Partnership -\nManagement',
    description:
      'We establish strategic patnership with the projects relevent to you, to position you in your market strongly',
  },
  {
    title: 'Social media -\nManagement',
    description:
      'We strategically manage your Web3 social accounts to drive engagement, increase brand awareness, and support sustainable growth.',
  },
  {
    title: 'Strategic\nAdvisory',
    description:
      'We offer strategic advisory to pave better way forward reducing complexity, marketing & web3 strategy.',
  },
  {
    title: 'Community\nManagement',
    description:
      'We expertly manage web3 communities with effective moderation, interactive discussion & engaging event hosting',
  },
  {
    title: 'Branding',
    description:
      'We develop attractive branding strategies tailored specifically for web3, NFT, Crypto Related Projects Positioning cleanly in your market.',
  },
  {
    title: 'Design',
    description:
      'Our highly skilled UI/UX design team delivers high-quality visuals and user-focused designs optimized for marketing performance and NFT experiences.',
  },
  {
    title: 'Development',
    description:
      'We provide expert development services to build, launch, and scale your website, platform, or smart contracts with reliability and efficiency.',
  },
  {
    title: 'Fund Raising',
    description:
      'We support projects in raising capital through our network of partnered venture capital firms and strategic investors.',
  },
];

// Gradient title component - fades right like hero text
const GradientTitle = ({ text, large = false }: { text: string; large?: boolean }) => (
  <h3
    className={`relative z-10 font-bold whitespace-pre-line ${large ? 'text-xl md:text-2xl' : 'text-base md:text-lg'}`}
    style={{
      background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 40%, rgba(255,255,255,0.4) 75%, rgba(255,255,255,0) 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    }}
  >
    {text}
  </h3>
);

// Service card with blue gradient glow at bottom
const ServiceCard = ({
  service,
  large = false,
  delay = 0,
  isInView,
}: {
  service: (typeof services)[0];
  large?: boolean;
  delay?: number;
  isInView: boolean;
}) => (
  <motion.div
    key={service.title}
    initial={{ opacity: 0, y: 30 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, delay }}
    className={`group relative rounded-2xl border flex flex-col justify-between overflow-hidden transition-all duration-500 hoverable ${
      large ? 'p-6 md:p-8 min-h-[340px] md:min-h-[380px]' : 'p-5 md:p-6 min-h-[260px] md:min-h-[300px]'
    } ${
      service.highlight
        ? 'border-blue-500/30'
        : 'border-white/10 hover:border-white/20'
    }`}
  >
    {/* Background image */}
    <img
      src="/Frame 6.png"
      alt=""
      className="absolute inset-0 w-full h-full object-cover object-bottom rounded-2xl pointer-events-none"
    />

    <div className="relative z-10">
      <p className={`text-gray-400 leading-relaxed ${large ? 'text-sm md:text-base' : 'text-xs md:text-sm'}`}>
        {service.description}
      </p>
    </div>

    <div className={`relative z-10 ${large ? 'mt-6' : 'mt-4'}`}>
      <GradientTitle text={service.title} large={large} />
    </div>
  </motion.div>
);

export const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" className="relative pt-6 md:pt-10 pb-16 md:pb-24 overflow-hidden bg-[#0a0a0a]">
      {/* Background */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px]"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        {/* Title - Ecosystem style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="gsap-badge inline-block px-6 py-2 border border-white/20 rounded-full text-sm text-gray-400 tracking-widest uppercase">
            Services
          </span>
          <p className="ecosystem-subtitle text-white/70 text-xl md:text-2xl font-bold mt-3 leading-tight tracking-wide">
            Our Service
          </p>
        </motion.div>

        {/* Top row - 3 large cards */}
        <div className="grid md:grid-cols-3 gap-5 md:gap-7 mb-5 md:mb-7">
          {services.slice(0, 3).map((service, i) => (
            <ServiceCard key={service.title} service={service} large delay={i * 0.1} isInView={isInView} />
          ))}
        </div>

        {/* Middle row - 4 cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7 mb-5 md:mb-7">
          {services.slice(3, 7).map((service, i) => (
            <ServiceCard key={service.title} service={service} delay={(i + 3) * 0.08} isInView={isInView} />
          ))}
        </div>

        {/* Bottom row - 4 cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7">
          {services.slice(7).map((service, i) => (
            <ServiceCard key={service.title} service={service} delay={(i + 7) * 0.08} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};
