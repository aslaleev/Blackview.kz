import type { HTMLAttributes, ReactNode } from 'react';

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  tone?: 'default' | 'accent';
};

function Card({ children, tone = 'default', className, ...props }: CardProps) {
  const classes = ['ui-card', `ui-card--${tone}`, className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

export { Card };
