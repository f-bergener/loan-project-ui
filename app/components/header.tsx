import Link from "next/link";

export default function Header() {
  return (
    <div className="flex justify-center items-center py-2 mb-4 border-b-2 border-b-gray-600">
      <Link href="/">
        <h1 className="text-3xl">Loan Project</h1>
      </Link>
    </div>
  );
}
