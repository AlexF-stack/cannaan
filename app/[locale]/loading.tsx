/** Indicateur discret pendant les changements de page (sans bloquer l'écran). */
export default function Loading() {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-0.5 overflow-hidden bg-amber-400/20"
      role="progressbar"
      aria-label="Chargement"
    >
      <div className="h-full w-1/3 animate-pulse bg-amber-400" />
    </div>
  );
}
