import Navigation from "@components/navigation/navbar";

export default function TestPage() {
  return (
    <div className="flex h-screen">
      <Navigation />
      <main className="mt-24 p-4">
        <h1 className="text-3xl">Welcome to WebSathi</h1>
      </main>
    </div>
  );
}
