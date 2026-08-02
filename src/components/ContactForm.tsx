'use client';

import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { services } from '@/lib/services';
import { site } from '@/lib/site';
import { IconArrowRight, IconCheck } from './Icons';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const mailtoFallback = (d: Record<string, string>) => {
    const subject = `Website enquiry from ${d.name}${d.service ? ` — ${d.service}` : ''}`;
    const body =
      `Name: ${d.name}\nEmail: ${d.email}\nPhone: ${d.phone || '—'}\nService: ${d.service || '—'}\n\n${d.message}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const d = Object.fromEntries(fd.entries()) as Record<string, string>;

    setStatus('submitting');
    setError('');

    try {
      const res = await fetch('/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(d),
      });
      const json = await res.json().catch(() => null);

      if (res.ok && json?.delivered) {
        setStatus('success');
        return;
      }
      if (res.status === 422 && json?.error) {
        setError(json.error);
        setStatus('error');
        return;
      }
      // Server reachable but not configured to send (or static hosting):
      // hand off to the visitor's email app addressed to info@.
      mailtoFallback(d);
      setStatus('success');
    } catch {
      // No API available (e.g. static hosting) — use mailto so the
      // enquiry still reaches info@thecatalystfze.com.
      mailtoFallback(d);
      setStatus('success');
    }
  };

  return (
    <div className="rounded-3xl border border-line bg-surface p-6 shadow-card sm:p-8">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-12 text-center"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-600 text-white">
              <IconCheck className="h-8 w-8" />
            </span>
            <h3 className="mt-6 font-display text-2xl font-bold text-ink">Thank you!</h3>
            <p className="mt-2 max-w-sm text-ink-muted">
              Your enquiry is on its way to our team. We’ll get back to you within one business day.
            </p>
            <button type="button" onClick={() => setStatus('idle')} className="btn-ghost mt-6">
              Send another enquiry
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            {/* honeypot */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" name="name" placeholder="Your name" required />
              <Field label="Email" name="email" type="email" placeholder="you@company.com" required />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Phone / WhatsApp" name="phone" placeholder="+971 …" />
              <div className="flex flex-col gap-1.5">
                <label htmlFor="service" className="text-sm font-semibold text-ink-soft">
                  Service of interest
                </label>
                <select
                  id="service"
                  name="service"
                  className="rounded-xl border border-line bg-surface-soft px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-brand-400 focus:bg-surface focus:ring-2 focus:ring-brand-100"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  {services.map((s) => (
                    <option key={s.slug} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                  <option value="Other">Something else</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-sm font-semibold text-ink-soft">
                How can we help?
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                placeholder="Tell us about your business and what you need…"
                className="resize-none rounded-xl border border-line bg-surface-soft px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-brand-400 focus:bg-surface focus:ring-2 focus:ring-brand-100"
              />
            </div>

            {status === 'error' && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{error}</p>
            )}

            <button type="submit" disabled={status === 'submitting'} className="btn-primary mt-2 w-full disabled:opacity-70">
              {status === 'submitting' ? 'Sending…' : 'Send Enquiry'}
              {status !== 'submitting' && <IconArrowRight className="h-4 w-4" />}
            </button>
            <p className="text-center text-xs text-ink-muted">
              Your enquiry goes straight to{' '}
              <a href={`mailto:${site.email}`} className="font-semibold text-brand-700">
                {site.email}
              </a>
              . We respect your privacy.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  name,
  type = 'text',
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-semibold text-ink-soft">
        {label} {required && <span className="text-brand-600">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="rounded-xl border border-line bg-surface-soft px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-brand-400 focus:bg-surface focus:ring-2 focus:ring-brand-100"
      />
    </div>
  );
}
