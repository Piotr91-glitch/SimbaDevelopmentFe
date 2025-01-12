import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-6">Nie znaleziono strony.</p>
      <Link href="/">
        <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Powrót do strony głównej
        </a>
      </Link>
    </div>
  );
}
