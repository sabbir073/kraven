'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  const handleXAuth = () => {
    // TODO: Implement X (Twitter) OAuth
    window.open('https://x.com', '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center relative overflow-hidden px-4">
      {/* Background effects */}
      <div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px]"
        style={{
          background: 'radial-gradient(circle, rgba(60, 80, 255, 0.08) 0%, transparent 70%)',
          filter: 'blur(120px)',
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px]"
        style={{
          background: 'radial-gradient(circle, rgba(60, 80, 255, 0.05) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <Link href="/" className="flex justify-center mb-10">
          <Image
            src="/KRAVEN-WHITE.png"
            alt="Kraven"
            width={160}
            height={50}
            className="h-10 w-auto"
          />
        </Link>

        {/* Card */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.3)]">
          {/* Toggle */}
          <div className="flex mb-8 rounded-full bg-white/5 border border-white/10 p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                isLogin
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                !isLogin
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-gray-400 text-sm">
              {isLogin
                ? 'Login with your X account to continue'
                : 'Sign up with your X account to get started'}
            </p>
          </div>

          {/* X Auth Button */}
          <motion.button
            onClick={handleXAuth}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-xl bg-white text-black font-semibold text-sm transition-all duration-300 hover:bg-gray-100 shadow-lg"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            {isLogin ? 'Login with X' : 'Sign up with X'}
          </motion.button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-gray-500 text-xs uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Alternative X button - outlined */}
          <motion.button
            onClick={handleXAuth}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-xl border border-white/15 bg-white/5 text-white font-medium text-sm transition-all duration-300 hover:border-blue-500/40 hover:bg-blue-500/5"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            {isLogin ? 'Continue with X Account' : 'Create Account with X'}
          </motion.button>

          {/* Info text */}
          <p className="text-center text-gray-500 text-xs mt-6 leading-relaxed">
            By continuing, you agree to Kraven&apos;s{' '}
            <Link href="/terms-of-service" className="text-blue-400 hover:text-blue-300 transition-colors">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy-policy" className="text-blue-400 hover:text-blue-300 transition-colors">
              Privacy Policy
            </Link>
          </p>
        </div>

        {/* Back to home */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-gray-500 hover:text-white text-sm transition-colors inline-flex items-center gap-2"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
