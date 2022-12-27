import {Link, useUrl, useCart, Image} from '@shopify/hydrogen';
import type {EnhancedMenu} from '~/lib/utils';
import {
  Heading,
  IconAccount,
  IconArrow,
  IconBag,
  IconMenu,
  IconSearch,
  Input,
} from '~/components';
import MyIcon from '../elements/MyIcon';

export function DesktopHeader({
  countryCode,
  isHome,
  menu,
  openCart,
  title,
}: {
  countryCode?: string | null;
  isHome: boolean;
  openCart: () => void;
  menu?: EnhancedMenu;
  title: string;
}) {
  const styles = {
    button:
      'relative flex items-center justify-center w-8 h-8 focus:ring-primary/5',
    container: 'w-full flex',
  };
  return (
    <header
      role="banner"
      className="w-full flex justify-around items-center h-11 bg-purple-200 px-20"
    >
      <Link to="/">
        <Image
          src="https://cdn.shopify.com/s/files/1/0467/7985/9095/files/20211119-logo-xtool_150x.png?v=1637285326"
          width={150}
          height={150}
          alt="xtool-logo"
        />
      </Link>
      <div className="flex">
        {(menu?.items || []).map((item) => (
          <Link
            key={item.id}
            to={item.to}
            target={item.target}
            className="flex py-2 px-4 text-sm font-medium hover:underline underline-offset-8"
          >
            <span
              dangerouslySetInnerHTML={{__html: item.title}}
              className="pr-1"
            ></span>
            {item.items.length ? <MyIcon icon="#icon-arrow-down" /> : null}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-1">
        <form
          action={`/${countryCode ? countryCode + '/' : ''}search`}
          className="flex items-center gap-2"
        >
          <Input
            className={
              isHome
                ? 'focus:border-contrast/20 dark:focus:border-primary/20'
                : 'focus:border-primary/20'
            }
            type="search"
            variant="minisearch"
            placeholder="Search"
            name="q"
          />
          <button type="submit" className={styles.button}>
            <IconSearch />
          </button>
        </form>
        <Link to={'/account'} className={styles.button}>
          <IconAccount />
        </Link>
        <button onClick={openCart} className={styles.button}>
          <IconBag />
          <CartBadge dark={isHome} />
        </button>
      </div>
    </header>
  );
}

function CartBadge({dark}: {dark: boolean}) {
  const {totalQuantity} = useCart();

  if (totalQuantity < 1) {
    return null;
  }
  return (
    <div
      className={`${
        dark
          ? 'text-primary bg-contrast dark:text-contrast dark:bg-primary'
          : 'text-contrast bg-primary'
      } absolute bottom-1 right-1 text-[0.625rem] font-medium subpixel-antialiased h-3 min-w-[0.75rem] flex items-center justify-center leading-none text-center rounded-full w-auto px-[0.125rem] pb-px`}
    >
      <span>{totalQuantity}</span>
    </div>
  );
}
