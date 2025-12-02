import { ImageResponse } from 'next/og';

// Image metadata
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

// This function generates the actual image
export default function Icon() {
  return new ImageResponse(
    (
      // We use simple HTML/CSS to draw the icon
      <div
        style={{
          fontSize: 24,
          background: 'transparent',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* SVG GRAPHIC:
           1. The first <path> is the WHITE LEAF shape.
           2. The second <path> is the POWER BOLT inside. 
              We give it the same color as the site background (#020617) 
              so it looks like a transparent cutout.
        */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ width: '32px', height: '32px' }}
        >
          {/* White Leaf Shape */}
          <path 
            d="M12 2C12 2 3 11 3 16C3 19.866 6.13401 23 10 23C13.866 23 17 19.866 17 16C17 11 12 2 12 2Z" 
            fill="white" 
            stroke="none"
          />
          {/* "Cutout" Power Bolt (using background color) */}
          <path 
            d="M10 18L13 11H9L12 5L8 13H11L10 18Z" 
            fill="#020617" 
            stroke="none"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}