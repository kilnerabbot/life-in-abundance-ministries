import { contact } from "@/content";

export default function WhatsAppButton() {
  const href = `https://wa.me/${contact.whatsappNumber}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-abundance-leaf text-white shadow-lg transition-transform hover:scale-105 focus-visible:scale-105"
    >
      <svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor" aria-hidden="true">
        <path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.386.7 4.61 1.912 6.484L4 29l7.7-1.877A11.94 11.94 0 0 0 16.001 27C22.628 27 28 21.627 28 15S22.628 3 16.001 3zm6.977 17.02c-.294.827-1.455 1.516-2.386 1.71-.633.13-1.46.234-4.245-.912-3.561-1.47-5.856-5.086-6.033-5.322-.177-.235-1.44-1.916-1.44-3.655s.914-2.593 1.24-2.95c.294-.323.646-.404.86-.404.213 0 .44.006.632.014.203.009.474-.077.741.566.294.706.998 2.437 1.084 2.615.088.177.147.383.03.618-.117.235-.176.383-.352.588-.177.206-.373.46-.53.617-.176.177-.36.368-.155.72.206.353.914 1.51 1.964 2.446 1.35 1.204 2.49 1.577 2.844 1.754.353.176.559.147.765-.088.206-.235.882-1.03 1.117-1.384.235-.353.47-.294.794-.176.323.117 2.052.968 2.404 1.144.353.177.588.265.677.412.088.147.088.851-.206 1.678z" />
      </svg>
    </a>
  );
}
