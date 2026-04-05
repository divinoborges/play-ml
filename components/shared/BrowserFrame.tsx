interface BrowserFrameProps {
  url?: string;
  children: React.ReactNode;
}

export default function BrowserFrame({
  url = "https://playml.app",
  children,
}: BrowserFrameProps) {
  return (
    <div className="rounded-xl border-2 border-black overflow-hidden">
      <div className="flex items-center gap-2 bg-sand px-4 py-2 border-b-2 border-black">
        <div className="h-3 w-3 rounded-full bg-red-pop" />
        <div className="h-3 w-3 rounded-full bg-yellow-pop" />
        <div className="h-3 w-3 rounded-full bg-lime-pop" />
        <div className="mx-4 flex-1 rounded-full bg-white px-4 py-1 text-sm text-black/40 font-body">
          {url}
        </div>
      </div>
      <div className="bg-white p-4">{children}</div>
    </div>
  );
}
