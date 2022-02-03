import { IconType } from 'react-icons';
import clsx from 'clsx';
import Input from './Input';
import styles from './Input.module.scss';

type Props = (
  | JSX.IntrinsicElements['input']
  | JSX.IntrinsicElements['textarea']
) & {
  id: string;
  label: string;
  Icon?: IconType;
};

export default function Field({ id, label, Icon, className, ...props }: Props) {
  return (
    <div className={clsx(styles.control, className)}>
      <Input Icon={Icon} id={id} {...props} />
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
    </div>
  );
}
