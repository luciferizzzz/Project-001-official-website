type LogoVariant = 'mark' | 'small';

const SOURCES = {
  mark: {
    src: '/assets/brand/project-001-logo.png',
    width: 640,
    height: 554,
  },
  small: {
    src: '/assets/brand/project-001-logo-small.png',
    width: 160,
    height: 139,
  },
} as const;

type LogoProps = {
  variant?: LogoVariant;
  alt?: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
};

/**
 * Official Project 001 mark, reproduced without recolouring or distortion.
 * The small file is a downscaled copy of the same artwork.
 */
export default function Logo({
  variant = 'mark',
  alt = 'Project 001 logo',
  className,
  loading = 'lazy',
  fetchPriority = 'auto',
}: LogoProps) {
  const source = SOURCES[variant];

  return (
    <img
      src={source.src}
      width={source.width}
      height={source.height}
      alt={alt}
      className={className}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
    />
  );
}
