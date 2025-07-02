import { useRef, useState, useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";

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
      (Array.isArray(state.errors) ? state.errors.length === 0 : !state.errors) &&
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
    <section
      id="contact"
      className="mx-auto my-24 max-w-xl px-4 font-montserrat"
    >
      <h1 className="text-5xl font-extrabold mb-8 text-black tracking-tight text-center uppercase">
        Contact
      </h1>
      <div className="flex flex-col items-center">
        <form
          ref={formRef}
          onSubmit={onSubmit}
          className="w-full bg-black rounded-2xl shadow-lg p-8 flex flex-col gap-7 border border-white"
          style={{
            boxShadow: "0 4px 32px 0 rgba(0,0,0,0.12)",
            maxWidth: 480,
          }}
        >
          <label className="flex flex-col gap-2 text-white font-semibold text-lg tracking-wide">
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
            <ValidationError prefix="Email" field="email" errors={state.errors} />
          </label>
          <label className="flex flex-col gap-2 text-white font-semibold text-lg tracking-wide">
            Message
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="bg-transparent border-b border-white py-2 px-1 focus:outline-none focus:border-gray-400 transition-colors text-white placeholder-gray-400 resize-none"
              placeholder="Type your message..."
            />
            <ValidationError prefix="Message" field="message" errors={state.errors} />
          </label>
          <button
            type="submit"
            disabled={state.submitting || cooldown > 0}
            className={`mt-4 bg-white text-black font-bold py-3 rounded-lg border border-black hover:bg-black hover:text-white transition-colors duration-200 uppercase tracking-widest shadow-none ${
              state.submitting || cooldown > 0 ? "opacity-60 cursor-not-allowed" : ""
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
            <p className="text-red-500 text-center font-semibold mt-2">{error}</p>
          )}
          {state.succeeded && (
            <p className="text-green-500 text-center font-semibold mt-2">
              Thank you for reaching out! I'll get back to you soon.
            </p>
          )}
        </form>
        <div className="mt-10 text-center text-black text-lg">
          Or email me directly:{" "}
          <a
            href="mailto:genokooijman@gmail.com"
            className="underline hover:text-gray-700 transition-colors"
          >
            genokooijman@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}