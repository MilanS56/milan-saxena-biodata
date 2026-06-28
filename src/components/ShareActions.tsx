import { Check, Copy, Download, MessageCircle } from "lucide-react";
import { useState } from "react";
import { profileContent } from "../data/profile";
import { buildWhatsappUrl, copyCurrentLink, downloadStructuredProfilePdf } from "../utils/share";

type ShareActionsProps = {
  phone: string;
  message: string;
  targetId: string;
};

export function ShareActions({ phone, message }: ShareActionsProps) {
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);

  const onCopy = async () => {
    await copyCurrentLink();
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const onDownload = async () => {
    setExporting(true);
    try {
      await downloadStructuredProfilePdf(profileContent, "milan-saxena-profile.pdf");
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-3">
      <a
        href={buildWhatsappUrl(phone, message)}
        target="_blank"
        rel="noreferrer"
        className="inline-flex min-h-12 items-center gap-2 border border-mehendi/25 bg-mehendi px-5 text-sm font-semibold text-ivory shadow-royal transition hover:-translate-y-0.5 hover:bg-mehendi/90 focus:outline-none focus:ring-2 focus:ring-antique"
        aria-label="Share on WhatsApp"
      >
        <MessageCircle size={18} />
        WhatsApp
      </a>
      <button
        type="button"
        onClick={onCopy}
        className="inline-flex min-h-12 items-center gap-2 border border-antique/50 bg-ivory px-5 text-sm font-semibold text-royal shadow-royal transition hover:-translate-y-0.5 hover:bg-white focus:outline-none focus:ring-2 focus:ring-antique"
      >
        {copied ? <Check size={18} /> : <Copy size={18} />}
        {copied ? "Copied" : "Copy Link"}
      </button>
      <button
        type="button"
        onClick={onDownload}
        disabled={exporting}
        className="inline-flex min-h-12 items-center gap-2 border border-pomegranate/25 bg-pomegranate px-5 text-sm font-semibold text-ivory shadow-royal transition hover:-translate-y-0.5 hover:bg-pomegranate/90 focus:outline-none focus:ring-2 focus:ring-antique disabled:cursor-wait disabled:opacity-70"
      >
        <Download size={18} />
        {exporting ? "Preparing" : "PDF"}
      </button>
    </div>
  );
}

