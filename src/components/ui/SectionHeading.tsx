import { Reveal } from '../motion/Reveal';

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'center',
  light = false,
  as: Tag = 'h2',
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: 'center' | 'left';
  light?: boolean;
  as?: 'h1' | 'h2';
}) {
  const alignCls = align === 'center' ? 'mx-auto text-center items-center' : 'text-left items-start';
  return (
    <div className={`flex max-w-2xl flex-col ${alignCls}`}>
      {eyebrow && (
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <Tag
          className={`mt-4 text-balance font-display text-3xl font-bold sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] ${
            light ? 'text-white' : 'text-ink'
          }`}
        >
          {title}
        </Tag>
      </Reveal>
      {intro && (
        <Reveal delay={0.1}>
          <p className={`mt-4 text-pretty text-base leading-relaxed sm:text-lg ${light ? 'text-white/70' : 'text-ink-muted'}`}>
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
