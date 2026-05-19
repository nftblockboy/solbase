import { NavBar } from "@/components/core/nav-bar";

export default function HomePage() {
  return (
    <main className="flex flex-col w-full h-full">

      {/* Header */}
      <header className="space-y-3 opacity-90">
        <NavBar />  
      </header>

      {/* Content */}
      <section>
        
      </section>
    </main>
  );
}