"use client";

type LogoVariant = "beam" | "plates" | "molten";

export default function Logo3D({ variant = "beam" }: { variant?: LogoVariant }) {
  return (
    <span className="flex items-center gap-2.5 group">
      {variant === "beam" && (
        <span className="logo3d-stage logo3d-spin">
          <span className="logo3d-beam-top" />
          <span className="logo3d-beam-web" />
          <span className="logo3d-beam-bottom" />
        </span>
      )}
      {variant === "plates" && (
        <span className="logo3d-stage">
          <span className="logo3d-plate p1" />
          <span className="logo3d-plate p2" />
          <span className="logo3d-plate p3" />
        </span>
      )}
      {variant === "molten" && (
        <span className="logo3d-stage logo3d-glow">
          <span className="logo3d-face f-front" />
          <span className="logo3d-face f-top" />
          <span className="logo3d-face f-right" />
        </span>
      )}
      <span className="logo3d-word text-xl text-white">
        Steel<span className="logo3d-setu">setu</span>
      </span>
    </span>
  );
}
