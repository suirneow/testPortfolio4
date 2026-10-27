export default function Contact() {
  return (
    <div className="px-6 py-10 md:px-10 md:py-14">
      <h1 className="font-outfit text-[11px] font-light tracking-[0.15em] uppercase mb-10 text-[var(--color-text-light)]">
        Contact
      </h1>

      <div className="max-w-xl space-y-8">
        <section>
          <h2 className="font-outfit text-[9px] font-light tracking-[0.15em] uppercase text-[var(--color-text-lighter)] mb-3">
            Email
          </h2>
          <a
            href="mailto:info@example.com"
            className="font-zalando text-[12px] font-light underline decoration-[var(--color-border)] hover:decoration-[var(--color-text)] transition-colors duration-200"
          >
            info@example.com
          </a>
        </section>

        <section>
          <h2 className="font-outfit text-[9px] font-light tracking-[0.15em] uppercase text-[var(--color-text-lighter)] mb-3">
            SNS
          </h2>
          <div className="space-y-2">
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block font-zalando text-[11px] font-light underline decoration-[var(--color-border)] hover:decoration-[var(--color-text)] transition-colors duration-200"
            >
              Twitter / X
            </a>
            <a
              href="https://vimeo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block font-zalando text-[11px] font-light underline decoration-[var(--color-border)] hover:decoration-[var(--color-text)] transition-colors duration-200"
            >
              Vimeo
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block font-zalando text-[11px] font-light underline decoration-[var(--color-border)] hover:decoration-[var(--color-text)] transition-colors duration-200"
            >
              Instagram
            </a>
          </div>
        </section>

        <section>
          <p className="font-noto text-[11px] font-light leading-[2] text-[var(--color-text-light)]">
            仕事のご依頼、展示のお声がけ、その他お気軽にどうぞ。
          </p>
        </section>
      </div>
    </div>
  );
}
