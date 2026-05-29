import Image from "next/image";

/**
 * Composant de chargement natif Next.js (loading.tsx)
 * S'affiche automatiquement lors des transitions de pages ou du chargement de données lentes.
 */
export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/70 backdrop-blur-md transition-all duration-300">
      
      {/* Halo de lumière en arrière-plan */}
      <div className="absolute w-[200px] h-[200px] bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute w-[150px] h-[150px] bg-amber-500/5 rounded-full blur-[60px] pointer-events-none" />

      <div className="relative flex flex-col items-center justify-center">
        {/* Spinner rotatif doré */}
        <div className="h-24 w-24 rounded-full border-2 border-slate-800 border-t-amber-400 animate-spin shadow-[0_0_15px_rgba(245,158,11,0.25)]" />
        
        {/* Logo pulsant centré dans l'anneau */}
        <div className="absolute h-14 w-14 animate-pulse flex items-center justify-center">
          <Image
            src="/images/canaan_logo_1779631751389.png"
            alt="CIRC Canaan"
            width={56}
            height={56}
            className="h-full w-full object-contain filter drop-shadow-[0_3px_6px_rgba(0,0,0,0.4)]"
            priority
          />
        </div>
      </div>
      
      <span className="mt-6 text-[10px] font-bold uppercase tracking-[0.25em] text-amber-400/80 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 animate-pulse">
        Chargement
      </span>
    </div>
  );
}
