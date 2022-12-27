export function HeaderFallback({isHome}: {isHome?: boolean}) {
  return (
    <header
      role="banner"
      className={`flex h-nav items-center backdrop-blur-lg z-40 top-0 justify-between w-full leading-none gap-8 px-12 py-8`}
    >
      <div className="flex space-x-4">loading</div>
    </header>
  );
}
