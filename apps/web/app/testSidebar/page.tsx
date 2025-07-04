import Sidebar from "@components/navigation/sidebar";

export default function Page() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="p-4">Content area</div>
    </div>
  );
}
