'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const socialLinks = [
  {
    name: 'Twitter',
    href: 'https://x.com/Kraven_Ai',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'Telegram',
    href: 'https://t.me/Kraven_Ai',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  {
    name: 'Discord',
    href: 'https://discord.gg/AzEyVJUmgd',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
  },
];

export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    projectName: '',
    projectLink: '',
    category: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Message sent successfully! We\'ll get back to you soon.',
        });
        setFormState({ name: '', email: '', projectName: '', projectLink: '', category: '', message: '' });
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || 'Failed to send message. Please try again.',
        });
      }
    } catch {
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden">
      {/* Full-width background image */}
      <div className="absolute inset-0">
        <img
          src="/contact.png"
          alt=""
          className="w-full h-full object-cover object-center pointer-events-none"
        />
      </div>

      <div className="relative z-10 py-16 sm:py-20 md:py-28" ref={ref}>
        {/* Title - top center */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14"
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
            style={{
              background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.9) 40%, rgba(255,255,255,0.4) 75%, rgba(255,255,255,0) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Get in Touch
          </h2>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Form on left */}
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <form
                onSubmit={handleSubmit}
                className="p-6 sm:p-8 md:p-10 rounded-2xl border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.06),0_0_80px_rgba(255,255,255,0.03)]"
              >
                <p className="text-center text-sm sm:text-base mb-6 sm:mb-8" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.5) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Fill the form below.
                </p>

                <div className="space-y-5 sm:space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ background: 'linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.7) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                      What is your full name?
                    </label>
                    <input
                      type="text"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-black/80 border border-white/10 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm sm:text-base text-white placeholder-gray-500 hoverable"
                      placeholder="Name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ background: 'linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.7) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                      What is your email?
                    </label>
                    <input
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-black/80 border border-white/10 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm sm:text-base text-white placeholder-gray-500 hoverable"
                      placeholder="example@example.com"
                    />
                  </div>

                  {/* Project Name */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ background: 'linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.7) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                      What is the project&apos;s name?
                    </label>
                    <input
                      type="text"
                      value={formState.projectName}
                      onChange={(e) => setFormState({ ...formState, projectName: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-black/80 border border-white/10 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm sm:text-base text-white placeholder-gray-500 hoverable"
                      placeholder="Project's Name"
                    />
                  </div>

                  {/* Project Link */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ background: 'linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.7) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                      Link to your project&apos;s website/socials
                    </label>
                    <input
                      type="text"
                      value={formState.projectLink}
                      onChange={(e) => setFormState({ ...formState, projectLink: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-black/80 border border-white/10 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm sm:text-base text-white placeholder-gray-500 hoverable"
                      placeholder="www.example.xyz"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ background: 'linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.7) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                      What is your project&apos;s category?
                    </label>
                    <input
                      type="text"
                      value={formState.category}
                      onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-black/80 border border-white/10 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm sm:text-base text-white placeholder-gray-500 hoverable"
                      placeholder="infra, NFT, gamefi, etc."
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ background: 'linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.7) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                      Describe what your project is building. Share any relevant links & information.
                    </label>
                    <textarea
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-black/80 border border-white/10 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none text-sm sm:text-base text-white placeholder-gray-500 hoverable"
                      placeholder="Your message here."
                    />
                  </div>

                  {submitStatus.type && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-3 sm:p-4 rounded-lg text-sm ${
                        submitStatus.type === 'success'
                          ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                          : 'bg-red-500/20 border border-red-500/30 text-red-400'
                      }`}
                    >
                      {submitStatus.message}
                    </motion.div>
                  )}

                  {/* Send button */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    disabled={isSubmitting}
                    className={`w-full py-3 sm:py-3.5 rounded-lg font-medium text-sm sm:text-base transition-all duration-300 backdrop-blur-md bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400 shadow-[0_0_20px_rgba(60,80,255,0.2)] hoverable flex items-center justify-center gap-2 ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </motion.button>
                </div>
              </form>

              {/* Social links below form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
                className="flex gap-3 mt-6"
              >
                {socialLinks.map((social, i) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full backdrop-blur-md bg-white/10 border border-white/10 hover:border-white/30 flex items-center justify-center text-gray-400 hover:text-white transition-all hoverable"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 border-t border-white/10 bg-black/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-6">
          <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 md:flex-row md:justify-between">
            <Image
              src="/KRAVEN-WHITE.png"
              alt="Kraven"
              width={120}
              height={40}
              className="h-8 w-auto sm:h-10"
            />
            <div className="flex items-center gap-3 text-xs text-gray-500 text-center">
              <span>© 2025 Kraven. All rights reserved.</span>
              <span className="text-gray-600">|</span>
              <span className="flex items-center gap-1.5">
                <img src="/copyright.png" alt="Avalanche" className="h-3.5 w-auto" />
                Build on Avalanche
              </span>
            </div>
            <div className="flex gap-4 sm:gap-6 text-xs text-gray-500">
              <a href="/privacy-policy" className="hover:text-white transition-colors hoverable">
                Privacy Policy
              </a>
              <a href="/terms-of-service" className="hover:text-white transition-colors hoverable">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
