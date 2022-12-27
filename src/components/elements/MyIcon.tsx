import clsx from 'clsx';

type MyIconProps = JSX.IntrinsicElements['svg'] & {
  icon: string;
};

export default function MyIcon({
  fill = 'currentColor',
  icon,
  className,
}: MyIconProps) {
  return (
    <svg fill={fill} aria-hidden="true" className={clsx('w-5 h-5', className)}>
      <use xlinkHref={icon}></use>
    </svg>
  );
}
