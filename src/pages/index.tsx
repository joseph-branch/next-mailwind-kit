import { Hello } from "./components/Hello";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#07070d]">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="bg-gradient-to-r from-[#c6f8ff] to-[#2326f5] bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-[5rem]">
          NextMailWindKit
        </h1>
        <Hello />
      </div>
    </main>
  );
}
