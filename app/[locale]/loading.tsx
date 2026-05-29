import Image from "next/image";

/** Chargement animé lors des transitions entre pages. */
export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/70 backdrop-blur-md transition-all duration-300">
      <div className="absolute h-[200px] w-[200px] rounded-full bg-blue-600/10 blur-[80px] pointer-events-none" />
      <div className="absolute h-[150px] w-[150px] rounded-full bg-amber-500/5 blur-[60px] pointer-events-none" />

      <div className="relative flex flex-col items-center justify-center">
        <div className="h-24 w-24 animate-spin rounded-full border-2 border-slate-800 border-t-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)]" />

        <div className="absolute flex h-14 w-14 animate-pulse items-center justify-center">
          <Image
            src="/images/canaan_logo_1779631751389.png"
            alt="CIRC Canaan"
            width={56}
            height={56}
            className="h-full w-full object-contain drop-shadow-[0_3px_6px_rgba(0,0,0,0.4)]"
            priority
          />
        </div>
      </div>

      <span className="mt-6 animate-pulse rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-amber-400/80">
        Chargement
      </span>
    </div>
  );
}
