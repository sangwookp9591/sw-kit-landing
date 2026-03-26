import { SITE_CONFIG } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="bg-aing-light py-12 px-6 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <p className="text-lg font-bold text-aing-dark">aing</p>
            <p className="text-sm text-aing-dark/60 mt-1">
              {SITE_CONFIG.description}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-aing-dark mb-2">Links</p>
            <a
              href={SITE_CONFIG.github}
              target="_blank"
              className="text-sm text-aing-dark/60 hover:text-aing-primary transition block"
            >
              GitHub
            </a>
            <a
              href={SITE_CONFIG.github}
              target="_blank"
              className="text-sm text-aing-dark/60 hover:text-aing-primary transition block"
            >
              Documentation
            </a>
          </div>

          <div>
            <p className="text-sm font-semibold text-aing-dark mb-2">Info</p>
            <p className="text-sm text-aing-dark/60">Apache-2.0</p>
            <p className="text-sm text-aing-dark/60">
              v{SITE_CONFIG.version}
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-xs text-aing-dark/40">
            2026 aing. Apache-2.0 License.
          </p>
        </div>
      </div>
    </footer>
  );
}
