import { memo, type FC } from 'react';

export const AppIcon: FC<{ size?: number; className?: string }> = memo(({ size = 32, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect width="32" height="32" rx="8" fill="url(#paint0_linear)" />
    <path
      d="M16 8C11.5817 8 8 11.5817 8 16C8 20.4183 11.5817 24 16 24C20.4183 24 24 20.4183 24 16C24 11.5817 20.4183 8 16 8ZM19.7 14.7L15.7 18.7C15.5 18.9 15.3 19 15 19C14.7 19 14.5 18.9 14.3 18.7L12.3 16.7C11.9 16.3 11.9 15.7 12.3 15.3C12.7 14.9 13.3 14.9 13.7 15.3L15 16.6L18.3 13.3C18.7 12.9 19.3 12.9 19.7 13.3C20.1 13.7 20.1 14.3 19.7 14.7Z"
      fill="white"
    />
    <defs>
      <linearGradient
        id="paint0_linear"
        x1="0"
        y1="0"
        x2="32"
        y2="32"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3B82F6" />
        <stop offset="1" stopColor="#8B5CF6" />
      </linearGradient>
    </defs>
  </svg>
));

AppIcon.displayName = 'AppIcon'; 