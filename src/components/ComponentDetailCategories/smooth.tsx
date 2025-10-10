// Smooth Scroll Container Component
export const SmoothScrollContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="relative group min-w-screen">
      <div className="overflow-x-auto pb-6 -mx-4 px-4 scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400">
        <div className="flex gap-4 md:gap-6" style={{ width: "max-content" }}>
          {children}
        </div>
      </div>

      {/* Gradient overlays for visual cue */}
      <div className="absolute left-0 top-0 bottom-6 w-12 bg-gradient-to-r from-white to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute right-0 top-0 bottom-6 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};
