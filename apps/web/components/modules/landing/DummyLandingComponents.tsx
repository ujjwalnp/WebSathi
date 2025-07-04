export const HoverPriceCard = () => (
  <div className="border p-4 rounded shadow text-center w-full max-w-md">
    [ HoverPriceCard Placeholder ]
  </div>
);

export const HeroContainerScroll = () => (
  <div className="h-[300px] bg-blue-100 flex items-center justify-center text-xl">
    [ HeroContainerScroll Placeholder ]
  </div>
);

export const InfiniteMovingCards = ({ pauseOnHover, speed }: { pauseOnHover: boolean; speed: string }) => (
  <div className="h-[200px] bg-green-100 flex items-center justify-center text-xl">
    [ InfiniteMovingCards Placeholder - speed: {speed} ]
  </div>
);

export const StickyScroll = () => (
  <div className="h-[300px] bg-yellow-100 flex items-center justify-center text-xl">
    [ StickyScroll Placeholder ]
  </div>
);

export const BackgroundBeams = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent -z-10 pointer-events-none" />
);
