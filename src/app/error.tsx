"use client";

export default function GlobalError(props: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-[60vh] grid place-items-center px-4 text-center">
      <div>
        <p className="text-6xl font-bold text-gradient">Oops</p>
        <h1 className="mt-4 text-2xl font-bold text-steel-navy">Something went wrong</h1>
        <p className="mt-3 text-steel-grey max-w-md mx-auto">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={props.reset}
          className="mt-6 bg-steel-blue hover:bg-steel-blue/85 text-white font-semibold px-6 py-3 rounded-xl glow-sm transition-all"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
