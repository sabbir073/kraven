'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface BookingPopupProps {
  isOpen: boolean;
  onClose: () => void;
  packageName: string;
  packagePrice: string;
}

// Generate available dates for the next 30 days
const generateAvailableDates = () => {
  const dates: Date[] = [];
  const today = new Date();
  for (let i = 1; i <= 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    // Skip weekends
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      dates.push(date);
    }
  }
  return dates;
};

// Available time slots
const timeSlots = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
];

export const BookingPopup = ({ isOpen, onClose, packageName, packagePrice }: BookingPopupProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telegramId: '',
    projectName: '',
    projectDescription: '',
    budget: '',
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const availableDates = generateAvailableDates();

  // Only render portal on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset form when popup closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setFormData({ name: '', email: '', telegramId: '', projectName: '', projectDescription: '', budget: '' });
        setSelectedDate(null);
        setSelectedTime(null);
        setIsSubmitted(false);
        setSubmitError(null);
      }, 300);
    }
  }, [isOpen]);

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          telegram: formData.telegramId,
          projectName: formData.projectName,
          projectDescription: `${formData.projectDescription}\n\nPreferred Date: ${formatDate(selectedDate)}\nPreferred Time: ${selectedTime} (UTC)`,
          budget: formData.budget,
          packageName,
          packagePrice,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        setSubmitError(data.error || 'Failed to submit booking. Please try again.');
      }
    } catch {
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const isDateAvailable = (date: Date) => {
    return availableDates.some(
      (d) => d.toDateString() === date.toDateString()
    );
  };

  // Generate calendar days for current month view
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days: (Date | null)[] = [];

    // Add empty slots for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Don't render on server side
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ cursor: 'auto' }}
          data-popup="true"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl glass border border-white/10"
            style={{ overscrollBehavior: 'contain', cursor: 'auto' }}
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full glass hover:bg-white/10 transition-colors z-10"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {isSubmitted ? (
              /* Success State */
              <div className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 15 }}
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center"
                >
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-bold mb-2">Booking Confirmed!</h3>
                <p className="text-gray-400 mb-4">
                  We&apos;ve received your booking request for <span className="text-cyan-400">{packageName}</span>
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  {selectedDate && formatDate(selectedDate)} at {selectedTime}
                </p>
                <p className="text-gray-400 text-sm">
                  Our team will contact you shortly via Telegram or email to confirm the details.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                >
                  Close
                </button>
              </div>
            ) : (
              /* Form State */
              <div className="p-6 md:p-8">
                {/* Header */}
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 rounded-full glass text-xs text-cyan-400 mb-3">
                    Book a Call
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold mb-1">{packageName}</h3>
                  <p className="text-purple-400 font-semibold">{packagePrice}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Error Message */}
                  {submitError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 text-sm"
                    >
                      {submitError}
                    </motion.div>
                  )}

                  {/* Personal Info */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl glass border border-white/10 bg-white/5 focus:border-cyan-500 focus:outline-none transition-colors"
                          placeholder="Enter your name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl glass border border-white/10 bg-white/5 focus:border-cyan-500 focus:outline-none transition-colors"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Telegram Username *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.telegramId}
                          onChange={(e) => setFormData({ ...formData, telegramId: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl glass border border-white/10 bg-white/5 focus:border-cyan-500 focus:outline-none transition-colors"
                          placeholder="@username"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Budget Range
                        </label>
                        <select
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl glass border border-white/10 bg-white/5 focus:border-cyan-500 focus:outline-none transition-colors"
                        >
                          <option value="" className="bg-[#111]">Select budget</option>
                          <option value="$1,000 - $5,000" className="bg-[#111]">$1,000 - $5,000</option>
                          <option value="$5,000 - $10,000" className="bg-[#111]">$5,000 - $10,000</option>
                          <option value="$10,000 - $25,000" className="bg-[#111]">$10,000 - $25,000</option>
                          <option value="$25,000+" className="bg-[#111]">$25,000+</option>
                          <option value="Custom" className="bg-[#111]">Custom / Flexible</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Project Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.projectName}
                        onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl glass border border-white/10 bg-white/5 focus:border-cyan-500 focus:outline-none transition-colors"
                        placeholder="Your project or company name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Project Description *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={formData.projectDescription}
                        onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl glass border border-white/10 bg-white/5 focus:border-cyan-500 focus:outline-none transition-colors resize-none"
                        placeholder="Brief description of your project and campaign goals..."
                      />
                    </div>
                  </div>

                  {/* Date Picker */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Select Date *
                    </label>
                    <div className="glass rounded-xl p-4 border border-white/10">
                      {/* Month Navigation */}
                      <div className="flex items-center justify-between mb-4">
                        <button
                          type="button"
                          onClick={goToPreviousMonth}
                          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M15 18l-6-6 6-6" />
                          </svg>
                        </button>
                        <span className="font-semibold">
                          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </span>
                        <button
                          type="button"
                          onClick={goToNextMonth}
                          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 18l6-6-6-6" />
                          </svg>
                        </button>
                      </div>

                      {/* Weekday Headers */}
                      <div className="grid grid-cols-7 gap-1 mb-2">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                          <div key={day} className="text-center text-xs text-gray-500 py-1">
                            {day}
                          </div>
                        ))}
                      </div>

                      {/* Calendar Days */}
                      <div className="grid grid-cols-7 gap-1">
                        {generateCalendarDays().map((date, index) => {
                          if (!date) {
                            return <div key={`empty-${index}`} className="p-2" />;
                          }
                          const isAvailable = isDateAvailable(date);
                          const isSelected = selectedDate?.toDateString() === date.toDateString();
                          const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));

                          return (
                            <button
                              key={date.toISOString()}
                              type="button"
                              disabled={!isAvailable || isPast}
                              onClick={() => setSelectedDate(date)}
                              className={`p-2 text-sm rounded-lg transition-all ${
                                isSelected
                                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                                  : isAvailable && !isPast
                                  ? 'hover:bg-white/10 text-white'
                                  : 'text-gray-600 cursor-not-allowed'
                              }`}
                            >
                              {date.getDate()}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Time Slots */}
                  {selectedDate && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                    >
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Select Time (UTC) *
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTime(time)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                              selectedTime === time
                                ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                                : 'glass border border-white/10 hover:border-cyan-500/50'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!selectedDate || !selectedTime || isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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
                        Booking...
                      </>
                    ) : (
                      <>
                        Confirm Booking
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
