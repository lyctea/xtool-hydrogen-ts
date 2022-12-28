import {Link, useCart, Image} from '@shopify/hydrogen';
import type {EnhancedMenu} from '~/lib/utils';
import {IconAccount, IconBag} from '~/components';
import MyIcon from '../elements/MyIcon';

export function DesktopHeader({
  isHome,
  menu,
  openCart,
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
      className="relative w-full flex justify-around items-center h-11 bg-purple-200 px-20"
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
            className="flex p-2 text-sm font-medium hover:underline  hover:bg-gray-300"
          >
            <span
              dangerouslySetInnerHTML={{__html: item.title}}
              className="pr-1"
            ></span>
            {item.items.length ? <MyIcon icon="#icon-arrow-down" /> : null}
            <section className="hidden absolute w-screen left-0 bg-slate-600">
              hover secton
              {(item?.items || []).map((subitem) => (
                <div key={subitem.id}>sub items</div>
              ))}
            </section>
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-1">
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
