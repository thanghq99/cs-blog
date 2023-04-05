import { useSidebarContext } from "@/src/contexts/siderbarContext";
import { useRouter } from "next/router";

export default function SidebarItem({ item }) {
  const router = useRouter();
  const goTo = (url) => {
    router.push(url);
  };
  const { open } = useSidebarContext();
  return (
    <div
      className={`h-12 flex items-center font-bold text-xl pl-3 transition-all border-red-400 hover:pl-1 hover:cursor-pointer hover:border-l-8 hover:border-black hover:bg-red-500 hover:text-slate-900 hover:font-bold hover:text-2xl hover:tracking-widest`}
      onClick={() => goTo(item.url)}
    >
      <div className={``}>{item.icon}</div>
      <div className={`ml-2 uppercase ${open ? "" : "hidden"}`}>
        {item.name}
      </div>
    </div>
  );
}
