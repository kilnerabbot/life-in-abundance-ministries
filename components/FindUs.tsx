import { contact } from "@/content";

export default function FindUs() {
  const whatsappHref = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(contact.whatsappMessage)}`;

  return (
    <section id="contact" aria-labelledby="findus-heading" className="bg-abundance-night py-24">
      <div className="container-px mx-auto grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-2">
        <div>
          <h2 id="findus-heading" className="font-display text-4xl font-semibold text-abundance-offwhite">
            {contact.heading}
          </h2>
          <p className="mt-4 font-body text-abundance-offwhite/80">{contact.address}</p>

          <ul className="mt-6 space-y-2">
            {contact.phones.map((phone) => (
              <li key={phone}>
                <a href={`tel:${phone}`} className="font-body text-abundance-leaf underline-offset-4 hover:underline">
                  {phone}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-abundance-leaf px-6 py-3 font-body text-sm font-semibold text-white shadow-md transition-transform hover:scale-105"
          >
            Chat on WhatsApp
          </a>

          <p className="mt-10 font-display text-xl italic text-abundance-offwhite">{contact.invitation}</p>
        </div>

        <div className="overflow-hidden rounded-xl shadow-lg">
          <iframe
            title="Map centered on Johannesburg"
            src={contact.mapEmbedSrc}
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: 320 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
