import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Mail,
  MessageSquare,
  Send,
} from "lucide-react";
import { Link } from "react-router-dom";

import SEO from "../components/common/SEO";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!form.subject.trim()) {
      newErrors.subject = "Please enter a subject.";
    }

    if (!form.message.trim()) {
      newErrors.message = "Please enter your message.";
    } else if (form.message.trim().length < 10) {
      newErrors.message =
        "Message must be at least 10 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [name]: "",
      }));
    }

    if (submitted) {
      setSubmitted(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitted(true);
    setForm(initialForm);
    setErrors({});
  };

  const inputClass = (field) => `
    mt-2
    w-full
    rounded-xl
    border
    bg-white
    px-4
    py-3
    text-sm
    text-slate-900
    outline-none
    transition
    placeholder:text-slate-400
    focus:border-blue-500
    focus:ring-4
    focus:ring-blue-500/10
    dark:bg-slate-950
    dark:text-white
    dark:placeholder:text-slate-500
    ${
      errors[field]
        ? "border-red-400 focus:border-red-500 focus:ring-red-500/10 dark:border-red-500"
        : "border-slate-200 dark:border-slate-700"
    }
  `;

  return (
    <>
      <SEO
        title="Contact"
        description="Get in touch with the Nexora team for questions, support and workspace assistance."
      />

      <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
        {/* Header */}
        <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
            <Link
              to="/"
              className="
                inline-flex
                items-center
                gap-2
                text-sm
                font-medium
                text-slate-500
                transition
                hover:text-blue-600
                focus-visible:outline-none
                focus-visible:ring-4
                focus-visible:ring-blue-500/20
                dark:text-slate-400
                dark:hover:text-blue-400
              "
            >
              <ArrowLeft size={16} />
              Back to Home
            </Link>

            <div className="mx-auto mt-10 max-w-2xl text-center">
              <span
                className="
                  inline-flex
                  rounded-full
                  bg-blue-50
                  px-3
                  py-1
                  text-xs
                  font-semibold
                  text-blue-600
                  dark:bg-blue-500/10
                  dark:text-blue-400
                "
              >
                Contact
              </span>

              <h1
                className="
                  mt-4
                  text-4xl
                  font-bold
                  tracking-tight
                  text-slate-900
                  sm:text-5xl
                  dark:text-white
                "
              >
                How can we help?
              </h1>

              <p
                className="
                  mx-auto
                  mt-4
                  max-w-xl
                  text-sm
                  leading-7
                  text-slate-500
                  sm:text-base
                  dark:text-slate-400
                "
              >
                Have a question about Nexora? Send us a message
                and we’ll get back to you as soon as possible
              </p>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="px-5 py-12 sm:px-8 sm:py-16">
          <div
            className="
              mx-auto
              grid
              max-w-6xl
              gap-6
              lg:grid-cols-[0.8fr_1.2fr]
            "
          >
            {/* Contact Information */}
            <div
              className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-6
                shadow-sm
                sm:p-8
                dark:border-slate-800
                dark:bg-slate-900
              "
            >
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-50
                  text-blue-600
                  dark:bg-blue-500/10
                  dark:text-blue-400
                "
              >
                <MessageSquare size={22} />
              </div>

              <h2 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">
                Contact Nexora
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Whether you have a question, need help with your
                workspace, or want to share feedback, we’re here
                to help
              </p>

              <div className="mt-8 space-y-5">
                <div className="flex gap-4">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-slate-100
                      text-slate-600
                      dark:bg-slate-800
                      dark:text-slate-300
                    "
                  >
                    <Mail size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      Email Support
                    </p>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Contact details will be available soon
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-slate-100
                      text-slate-600
                      dark:bg-slate-800
                      dark:text-slate-300
                    "
                  >
                    <Clock3 size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      Response Time
                    </p>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      We aim to respond as soon as possible
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="
                  mt-8
                  rounded-xl
                  border
                  border-blue-100
                  bg-blue-50
                  p-4
                  dark:border-blue-500/20
                  dark:bg-blue-500/10
                "
              >
                <p className="text-sm font-semibold text-blue-900 dark:text-blue-200">
                  Need help with your workspace?
                </p>

                <p className="mt-1 text-xs leading-5 text-blue-700 dark:text-blue-300">
                  Tell us what you need help with and include
                  enough detail so we can understand your request
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div
              className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-6
                shadow-sm
                sm:p-8
                dark:border-slate-800
                dark:bg-slate-900
              "
            >
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Send us a message
                </h2>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Fill out the form below and share your message
                  with us
                </p>
              </div>

              {submitted && (
                <div
                  role="status"
                  className="
                    mt-6
                    flex
                    items-start
                    gap-3
                    rounded-xl
                    border
                    border-emerald-200
                    bg-emerald-50
                    p-4
                    dark:border-emerald-500/20
                    dark:bg-emerald-500/10
                  "
                >
                  <CheckCircle2
                    size={19}
                    className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400"
                  />

                  <div>
                    <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                      Message received
                    </p>

                    <p className="mt-1 text-xs leading-5 text-emerald-700 dark:text-emerald-400">
                      Your message has been submitted successfully
                    </p>
                  </div>
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                noValidate
                className="mt-6 space-y-5"
              >
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-slate-700 dark:text-slate-200"
                  >
                    Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={
                      errors.name ? "name-error" : undefined
                    }
                    className={inputClass("name")}
                  />

                  {errors.name && (
                    <p
                      id="name-error"
                      className="mt-1.5 text-xs text-red-600 dark:text-red-400"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-slate-700 dark:text-slate-200"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={
                      errors.email ? "email-error" : undefined
                    }
                    className={inputClass("email")}
                  />

                  {errors.email && (
                    <p
                      id="email-error"
                      className="mt-1.5 text-xs text-red-600 dark:text-red-400"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="text-sm font-medium text-slate-700 dark:text-slate-200"
                  >
                    Subject
                  </label>

                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={
                      errors.subject
                        ? "subject-error"
                        : undefined
                    }
                    className={inputClass("subject")}
                  />

                  {errors.subject && (
                    <p
                      id="subject-error"
                      className="mt-1.5 text-xs text-red-600 dark:text-red-400"
                    >
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-slate-700 dark:text-slate-200"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Write your message..."
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message
                        ? "message-error"
                        : undefined
                    }
                    className={`${inputClass(
                      "message"
                    )} resize-y`}
                  />

                  {errors.message && (
                    <p
                      id="message-error"
                      className="mt-1.5 text-xs text-red-600 dark:text-red-400"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="
                    inline-flex
                    h-11
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-linear-to-r
                    from-blue-600
                    to-cyan-500
                    px-5
                    text-sm
                    font-semibold
                    text-white
                    shadow-lg
                    shadow-blue-500/20
                    transition
                    hover:from-blue-700
                    hover:to-cyan-600
                    focus-visible:outline-none
                    focus-visible:ring-4
                    focus-visible:ring-blue-500/20
                  "
                >
                  <Send size={17} />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <div
            className="
              mx-auto
              flex
              max-w-6xl
              flex-col
              gap-4
              px-5
              py-6
              sm:px-8
              md:flex-row
              md:items-center
              md:justify-between
            "
          >
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">
                Nexora
              </p>

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Modern SaaS workspace for teams.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400">
              <Link
                to="/privacy"
                className="transition hover:text-blue-600 dark:hover:text-blue-400"
              >
                Privacy
              </Link>

              <Link
                to="/terms"
                className="transition hover:text-blue-600 dark:hover:text-blue-400"
              >
                Terms
              </Link>

              <Link
                to="/login"
                className="transition hover:text-blue-600 dark:hover:text-blue-400"
              >
                Sign In
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}