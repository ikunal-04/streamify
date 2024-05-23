import { AppBar } from "@/components/appbar";

export default function Home() {
  return (
    <div className="bg-black h-screen text-white">
      <div>
        {/* code for the landing page */}
        <AppBar />
      </div>
      <div className="flex justify-center">
        <h1>Home</h1>
      </div>
    </div>
  );
}
