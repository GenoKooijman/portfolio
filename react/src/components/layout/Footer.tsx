import { useRef, useState, useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";
import github from "@/assets/github.png";
import cv from "@/assets/cv.png";
import linkedIn from "@/assets/LinkedIn.png";

const COOLDOWN_MINUTES = 10;

function getCooldown() {
  const lastSent = localStorage.getItem("contact_last_sent");
  if (!lastSent) return 0;
  const diff = Date.now() - parseInt(lastSent, 10);
  return Math.max(0, COOLDOWN_MINUTES * 60 * 1000 - diff);
}

export default function HomeContacts() {
  const formRef = useRef<HTMLFormElement>(null);
  const [cooldown, setCooldown] = useState(getCooldown());
  const [error, setError] = useState<string | null>(null);
  const [state, handleSubmit] = useForm("mblybjdo");

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => {
        setCooldown(getCooldown());
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [cooldown]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (cooldown > 0) {
      setError("Please wait before sending another message.");
      return;
    }

    await handleSubmit(e);
    if (
      (Array.isArray(state.errors)
        ? state.errors.length === 0
        : !state.errors) &&
      state.succeeded
    ) {
      localStorage.setItem("contact_last_sent", Date.now().toString());
      setCooldown(COOLDOWN_MINUTES * 60 * 1000);
      if (formRef.current) formRef.current.reset();
    }
  };

  const cooldownText = () => {
    const seconds = Math.ceil(cooldown / 1000);
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <footer
      id="contact"
      className="w-full bg-black text-white py-16 px-4 mt-24 font-montserrat border-t border-white"
    >
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-12">
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-6 uppercase tracking-widest">
            Contact
          </h2>
          <form
            ref={formRef}
            onSubmit={onSubmit}
            className="flex flex-col gap-6"
            style={{ maxWidth: 400 }}
          >
            <label className="flex flex-col gap-2 font-semibold text-lg tracking-wide">
              Email
              <input
                id="email"
                type="email"
                name="email"
                required
                className="bg-transparent border-b border-white py-2 px-1 focus:outline-none focus:border-gray-400 transition-colors text-white placeholder-gray-400"
                placeholder="your@email.com"
                autoComplete="off"
              />
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
              />
            </label>
            <label className="flex flex-col gap-2 font-semibold text-lg tracking-wide">
              Message
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="bg-transparent border-b border-white py-2 px-1 focus:outline-none focus:border-gray-400 transition-colors text-white placeholder-gray-400 resize-none"
                placeholder="Type your message..."
              />
              <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
              />
            </label>
            <button
              type="submit"
              disabled={state.submitting || cooldown > 0}
              className={`mt-2 bg-white text-black font-bold py-2 rounded-lg border border-black hover:bg-black hover:text-white transition-colors duration-200 uppercase tracking-widest shadow-none ${
                state.submitting || cooldown > 0
                  ? "opacity-60 cursor-not-allowed"
                  : ""
              }`}
              style={{
                letterSpacing: "0.15em",
              }}
            >
              {cooldown > 0
                ? `Wait ${cooldownText()}`
                : state.submitting
                ? "Sending..."
                : "Send"}
            </button>
            {error && (
              <p className="text-red-400 text-center font-semibold mt-2">
                {error}
              </p>
            )}
            {state.succeeded && (
              <p className="text-green-400 text-center font-semibold mt-2">
                Thank you for reaching out! I'll get back to you soon.
              </p>
            )}
          </form>
        </div>
        <div className="flex-1 flex flex-col items-start gap-6 md:items-end">
          <h2 className="text-3xl font-bold mb-2 uppercase tracking-widest">
            Links
          </h2>
          <div className="flex flex-row gap-8 mt-2">
            <a
              href="https://github.com/genokooijman"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
              className="flex flex-col items-center justify-center bg-white rounded-full w-14 h-14 shadow-md hover:scale-105 transition-transform border border-gray-200"
            >
              <img src={github} alt="GitHub" className="w-10 h-10 mb-1" />
            </a>
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              title="CV"
              className="flex flex-col items-center justify-center bg-white rounded-full w-14 h-14 shadow-md hover:scale-105 transition-transform border border-gray-200"
            >
              <img src={cv} alt="CV" className="w-10 h-10 mb-1" />
            </a>
            <a
              href="https://www.linkedin.com/in/genokooijman/"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              className="flex flex-col items-center justify-center bg-white rounded-full w-14 h-14 shadow-md hover:scale-105 transition-transform border border-gray-200"
            >
              <img src={linkedIn} alt="LinkedIn" className="w-10 h-10 mb-1" />
            </a>
          </div>
          <div className="mt-48 text-gray-400 text-sm">
            Or email me directly:{" "}
            <a
              href="mailto:genokooijman@gmail.com"
              className="underline hover:text-gray-200"
            >
              genokooijman@gmail.com
            </a>
          </div>
        </div>
      </div>
      <div className="mt-12 text-center text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} Geno Kooijman. All rights reserved.
      </div>
    </footer>
  );
}
