import React from 'react';

interface QuasarLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  subtitle?: string;
}

export const QuasarIcon: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 36
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="quasarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#818cf8" />
        </linearGradient>
      </defs>

      {/* Tilted Planetary Ring System */}
      <g>
        {/* Back upper section of ring (behind planet) */}
        <path
          d="M 28 66 C 18 63 15 56 23 49 C 34 39 59 26 84 20 C 97 17 104 20 102 27 C 100 32 90 38 78 44 L 81 40 C 92 34 97 29 95 25 C 93 22 87 21 78 24 C 56 30 33 42 24 50 C 20 54 21 58 26 60 Z"
          fill="currentColor"
        />

        {/* Planet Body: Stylized letter 'Q' with hollow core */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M 58 16 C 76.78 16 92 31.22 92 50 C 92 58.2 89.1 65.7 84.2 71.6 C 81.5 75 77 78.5 70.5 81 C 63.5 83.5 56 83.5 50.5 81 C 46 79 43.5 74.5 45 70 C 46.5 65.5 50.5 64 54 65 C 57 66 60.5 65.5 63.5 63 C 67.5 59.8 70.5 54.5 71 49 C 71.5 43.5 69.5 38 65.5 33 C 60.5 27 53.5 24 46 24 C 33.85 24 24 33.85 24 46 C 24 58.15 33.85 68 46 68 C 47.8 68 49.5 67.8 51.2 67.4 C 50.2 70.2 48.5 73 45.8 74 C 44 74.6 42.2 74.5 40.5 74 C 40 76.5 41.5 79 44.5 80 C 47.5 81 51 80.8 55 79.5 C 64 76.5 71.5 71.5 76.8 65 C 83.5 57 86.5 48 85.5 40 C 84 28 73 18 58 16 Z M 56 25 C 43.85 25 34 34.85 34 47 C 34 59.15 43.85 69 56 69 C 58.2 69 60.3 68.7 62.3 68.1 C 61.5 65 60.2 61 58.8 56.5 C 55 57 52.5 54.5 52.5 51 C 52.5 48.5 54 46.5 56.5 45.5 L 56.5 37 C 56.5 34 57.5 31.5 58 30.5 C 58.5 31.5 59.5 34 59.5 37 L 59.5 45.5 C 62 46.5 63.5 48.5 63.5 51 C 63.5 54.5 61 57 57.2 56.5 C 58.5 61 59.8 65 60.8 68 C 68 66 73.5 60.5 75 53 C 76.5 46 75.5 39 71.5 33 C 67.5 28 62 25 56 25 Z"
          fill="currentColor"
        />

        {/* Center Rocket Silhouette rising inside the core */}
        <path
          d="M 58 29 C 56.2 34 54 41 54 48 C 54 51.5 52 53.5 50 54.5 C 52.8 55.2 55.5 54 56.2 51.8 L 56.2 58 C 57.2 59 58.8 59 59.8 58 L 59.8 51.8 C 60.5 54 63.2 55.2 66 54.5 C 64 53.5 62 51.5 62 48 C 62 41 59.8 34 58 29 Z"
          fill="currentColor"
        />

        {/* Front lower section of ring (wrapping over planet) */}
        <path
          d="M 12 71 C 22 79 38 80 57 71 C 55.5 68.5 54.2 65.5 53.5 62 C 39 68 25 67 17 62 C 13 59.5 13 55 17 51 C 23 46 35 39 49 33 C 50.2 30.8 51.5 28.5 53 26.5 C 37 32 21 40 13 46 C 6 52 5 62 12 71 Z"
          fill="currentColor"
        />
        <path
          d="M 72 49 C 80 44 89 38 98 32 C 107 26 110 19 105 15 C 101 12 90 14 78 19 C 75 20.2 72 21.8 69 23.2 C 70.5 25.2 72 27.5 73.2 30 C 83.5 25 92 22 96 23 C 98.5 23.8 98 26.2 93 29.5 C 87 34 78 40 70 45 Z"
          fill="currentColor"
        />

        {/* Orbiting Moon dot at lower-right */}
        <circle cx="91" cy="74" r="5" fill="currentColor" />
      </g>
    </svg>
  );
};

export const SpaceExplorerIcon: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 32
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-[0_0_10px_rgba(56,189,248,0.7)] ${className}`}
      aria-hidden="true"
    >
      {/* Back section of orbital ring */}
      <path
        d="M 22 56 C 14 52 13 44 23 37 C 38 27 68 18 84 22 C 92 24 93 29 88 34"
        stroke="#38bdf8"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Central planet circle */}
      <circle
        cx="50"
        cy="50"
        r="24"
        stroke="#38bdf8"
        strokeWidth="4.5"
        fill="#05070f"
      />
      {/* Planet surface subtle inner ring line */}
      <circle
        cx="50"
        cy="50"
        r="23"
        stroke="#0284c7"
        strokeWidth="1.5"
        strokeOpacity="0.6"
      />
      {/* Front wrapping section of orbital ring */}
      <path
        d="M 12 64 C 18 73 44 78 72 65 C 84 60 92 53 88 47"
        stroke="#38bdf8"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const SpaceExplorerLogo: React.FC<{ className?: string; size?: 'sm' | 'md' }> = ({
  className = '',
  size = 'md'
}) => {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <SpaceExplorerIcon size={size === 'sm' ? 28 : 34} />
      <span
        className="font-bold font-display uppercase tracking-tight text-white group-hover:text-cyan-400 transition-colors text-base sm:text-lg"
        style={{ fontFamily: "'Space Grotesk', -apple-system, sans-serif" }}
      >
        SPACE EXPLORER
      </span>
    </div>
  );
};

export const QuasarLogo: React.FC<QuasarLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  subtitle
}) => {
  const iconSizes = {
    sm: 32,
    md: 40,
    lg: 52
  };

  const textSizes = {
    sm: 'text-lg tracking-[0.24em]',
    md: 'text-2xl tracking-[0.28em]',
    lg: 'text-3xl tracking-[0.32em]'
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Icon with glowing aura */}
      <div className="relative flex items-center justify-center text-cyan-400 group-hover:text-cyan-300 transition-colors drop-shadow-[0_0_12px_rgba(6,182,212,0.35)]">
        <QuasarIcon size={iconSizes[size]} className="transition-transform group-hover:scale-105 duration-200" />
      </div>

      {/* Styled Wordmark */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-bold font-display uppercase leading-none text-[var(--text-primary)] group-hover:text-cyan-400 transition-colors ${textSizes[size]}`}
              style={{ fontFamily: "'Space Grotesk', -apple-system, sans-serif" }}
            >
              QUASAR
            </span>
          </div>
          {subtitle && (
            <span className="text-[9px] font-mono tracking-[0.2em] text-[var(--text-muted)] uppercase mt-0.5">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
