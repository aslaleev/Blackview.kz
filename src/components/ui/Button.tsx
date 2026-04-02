import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type SharedProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md';
  className?: string;
};

type ButtonAsButton = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

function Button(props: ButtonProps) {
  const { children, variant = 'primary', size = 'md', className } = props;
  const classes = ['ui-button', `ui-button--${variant}`, `ui-button--${size}`, className]
    .filter(Boolean)
    .join(' ');

  if ('href' in props && props.href) {
    const { href, variant: _variant, size: _size, className: _className, children: _children, ...linkProps } = props;
    return (
      <a className={classes} href={href} {...linkProps}>
        {children}
      </a>
    );
  }

  const buttonOnlyProps = props as ButtonAsButton;
  const { variant: _variant, size: _size, className: _className, children: _children, ...buttonProps } = buttonOnlyProps;
  const type: ButtonHTMLAttributes<HTMLButtonElement>['type'] = buttonOnlyProps.type ?? 'button';

  return (
    <button className={classes} type={type} {...buttonProps}>
      {children}
    </button>
  );
}

export { Button };
