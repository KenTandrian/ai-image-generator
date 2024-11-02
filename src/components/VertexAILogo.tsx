import type { SVGProps } from "react";

export default function VertexAILogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="512px"
      height="512px"
      {...props}
    >
      <defs>
        <style>
          {`
            .cls-1 { fill: none; }
            .cls-1, .cls-2, .cls-3, .cls-4, .cls-5 { stroke-width: 0px; }
            .cls-2 { fill: #34a853; }
            .cls-3 { fill: #4285f4; }
            .cls-4 { fill: #ea4335; }
            .cls-5 { fill: #fbbc04;}
          `}
        </style>
      </defs>
      <g id="bounding_box" data-name="bounding box">
        <rect
          id="bounding_box-2"
          data-name="bounding box-2"
          className="cls-1"
          width="512"
          height="512"
        />
      </g>
      <g id="art_layer" data-name="art layer">
        <path
          className="cls-4"
          d="M128,249c-8.8,0-16-7.2-16-16v-105c0-8.8,7.2-16,16-16s16,7.2,16,16v105c0,8.8-7.2,16-16,16Z"
        />
        <path
          className="cls-5"
          d="M256,464c-3,0-6-.8-8.6-2.5l-176-112c-7.5-4.7-9.7-14.6-4.9-22.1,4.8-7.5,14.6-9.6,22.1-4.9l167.4,106.5,167.4-106.5c7.5-4.7,17.3-2.5,22.1,4.9,4.7,7.5,2.5,17.3-4.9,22.1l-176,112c-2.6,1.7-5.6,2.5-8.6,2.5h0Z"
        />
        <path
          className="cls-2"
          d="M256,394c-8.8,0-16-7.2-16-16v-73.1c0-8.8,7.2-16,16-16s16,7.2,16,16v73.1c0,8.8-7.2,16-16,16Z"
        />
        <circle className="cls-4" cx="128" cy="64" r="16" />
        <circle className="cls-4" cx="128" cy="297" r="16" />
        <path
          className="cls-3"
          d="M384.2,314c-8.8,0-16-7.1-16-16l-.2-106c0-8.8,7.1-16,16-16h0c8.8,0,16,7.1,16,16l.2,106c0,8.8-7.1,16-16,16h0Z"
        />
        <circle className="cls-3" cx="384" cy="64" r="16" />
        <circle className="cls-3" cx="384" cy="128" r="16" />
        <path
          className="cls-5"
          d="M320,225c-8.8,0-16-7.2-16-16v-103c0-8.8,7.2-16,16-16s16,7.2,16,16v103c0,8.8-7.2,16-16,16Z"
        />
        <circle className="cls-2" cx="256" cy="177" r="16" />
        <circle className="cls-2" cx="256" cy="241" r="16" />
        <circle className="cls-5" cx="320" cy="273" r="16" />
        <circle className="cls-5" cx="320" cy="337" r="16" />
        <path
          className="cls-5"
          d="M192,225c-8.8,0-16-7.2-16-16v-103c0-8.8,7.2-16,16-16s16,7.2,16,16v103c0,8.8-7.2,16-16,16Z"
        />
        <circle className="cls-5" cx="192" cy="273" r="16" />
        <circle className="cls-5" cx="192" cy="337" r="16" />
      </g>
    </svg>
  );
}
