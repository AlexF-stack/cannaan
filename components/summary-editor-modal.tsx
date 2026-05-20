"use client";

import { useRef } from "react";

interface SummaryEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSummary: string;
  onSave: (newText: string) => void;
}

export default function SummaryEditorModal({
  isOpen,
  onClose,
  currentSummary,
  onSave,
}: SummaryEditorModalProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSave = () => {
    onSave(textareaRef.current?.value ?? "");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-slate-800">
        <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">Modifier le resume</h2>
        <textarea
          ref={textareaRef}
          defaultValue={currentSummary}
          className="h-40 w-full rounded-md border border-slate-200 bg-white p-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        />
        <div className="mt-4 flex justify-end gap-4">
          <button
            className="rounded bg-slate-100 px-4 py-2 text-slate-900 transition-colors hover:bg-slate-200 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
            onClick={onClose}
          >
            Annuler
          </button>
          <button
            className="rounded bg-amber-400 px-4 py-2 font-bold text-slate-900 transition-colors hover:bg-amber-300"
            onClick={handleSave}
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}
