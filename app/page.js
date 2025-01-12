import Image from "next/image";

export default function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Image
        src="/images/background2.jpg"
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        priority
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold">Witaj w aplikacji</h1>
        <p className=" text-xl mt-4">Simba development</p>
      </div>
    </div>
  );
}