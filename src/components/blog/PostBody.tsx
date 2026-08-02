import type { ContentBlock } from '@/lib/blog';

export function PostBody({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="flex flex-col gap-5">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'h2':
            return (
              <h2 key={i} className="mt-6 font-display text-2xl font-bold text-ink sm:text-3xl">
                {block.text}
              </h2>
            );
          case 'h3':
            return (
              <h3 key={i} className="mt-4 font-display text-xl font-bold text-ink">
                {block.text}
              </h3>
            );
          case 'p':
            return (
              <p key={i} className="text-pretty text-[1.05rem] leading-relaxed text-ink-soft">
                {block.text}
              </p>
            );
          case 'ul':
            return (
              <ul key={i} className="flex flex-col gap-2.5">
                {block.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-ink-soft">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            );
          case 'ol':
            return (
              <ol key={i} className="flex flex-col gap-2.5">
                {block.items.map((item, j) => (
                  <li key={item} className="flex items-start gap-3 text-ink-soft">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-bold text-brand-700">
                      {j + 1}
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ol>
            );
          case 'quote':
            return (
              <blockquote
                key={i}
                className="my-2 rounded-2xl border-l-4 border-brand-500 bg-brand-50/60 px-6 py-5 font-display text-lg font-medium italic text-ink"
              >
                {block.text}
              </blockquote>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
