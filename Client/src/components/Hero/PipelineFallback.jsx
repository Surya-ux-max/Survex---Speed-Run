import React from 'react';

export default function PipelineFallback() {
  return (
    <div className="pipeline-fallback" aria-label="A 3D simulation of a data pipeline">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ maxWidth: '400px' }}
      >
        {/* Gradients */}
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#172B36" />
            <stop offset="50%" stopColor="#114C5A" />
            <stop offset="100%" stopColor="#172B36" />
          </linearGradient>
        </defs>

        {/* Asymmetric Knot Curve representing the conduit */}
        <path
          d="M 50 200 C 50 50, 150 50, 200 200 C 250 350, 350 350, 350 200 C 350 50, 250 50, 200 200 C 150 350, 50 350, 50 200 Z"
          stroke="url(#lineGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          opacity="0.8"
        />

        {/* Outer Emissive/Highlight Lines */}
        <path
          d="M 50 200 C 50 50, 150 50, 200 200 C 250 350, 350 350, 350 200"
          stroke="#FFC801"
          strokeWidth="1.5"
          strokeDasharray="8 20"
          fill="none"
        />

        {/* Stations: INGEST, TRANSFORM, VALIDATE, DELIVER */}
        {/* Ingest (t=0.12 approx) */}
        <g transform="translate(90, 120)">
          <polygon points="0,-8 7,-4 7,4 0,8 -7,4 -7,-4" fill="#172B36" stroke="#FFC801" strokeWidth="1.5" />
          <text x="12" y="4" fill="#F1F6F4" fontSize="8" fontFamily="JetBrains Mono" fontWeight="600">INGEST</text>
        </g>

        {/* Transform (t=0.31 approx) */}
        <g transform="translate(200, 200)">
          <polygon points="0,-8 7,-4 7,4 0,8 -7,4 -7,-4" fill="#172B36" stroke="#FFC801" strokeWidth="1.5" />
          <text x="12" y="4" fill="#F1F6F4" fontSize="8" fontFamily="JetBrains Mono" fontWeight="600">TRANSFORM</text>
        </g>

        {/* Validate (t=0.62 approx) */}
        <g transform="translate(310, 120)">
          <polygon points="0,-8 7,-4 7,4 0,8 -7,4 -7,-4" fill="#172B36" stroke="#FFC801" strokeWidth="1.5" />
          <text x="-65" y="4" fill="#F1F6F4" fontSize="8" fontFamily="JetBrains Mono" fontWeight="600">VALIDATE</text>
        </g>

        {/* Deliver (t=0.85 approx) */}
        <g transform="translate(150, 280)">
          <polygon points="0,-8 7,-4 7,4 0,8 -7,4 -7,-4" fill="#172B36" stroke="#FFC801" strokeWidth="1.5" />
          <text x="12" y="4" fill="#F1F6F4" fontSize="8" fontFamily="JetBrains Mono" fontWeight="600">DELIVER</text>
        </g>

        {/* Floating Data Packets */}
        <polygon points="50,200 46,205 54,205" fill="#FFC801" />
        <polygon points="270,250 266,255 274,255" fill="#FF9932" />
        <polygon points="120,290 116,295 124,295" fill="#FFC801" />
      </svg>
    </div>
  );
}
