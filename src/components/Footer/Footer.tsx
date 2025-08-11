import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex justify-between gap-3 bg-white p-3">
      <p className="text-sm text-gray-800">
        Copyright © 2025{" "}
        <Link className="text-main underline" href={"#"}>
          IMETS
        </Link>
      </p>
      <ul className="flex gap-3 text-sm">
        <li>
          <Link
            className="p-2 transition hover:text-main hover:underline"
            href={"#"}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            className="p-2 transition hover:text-main hover:underline"
            href={"#"}
          >
            Terms
          </Link>
        </li>
        <li>
          <Link
            className="p-2 transition hover:text-main hover:underline"
            href={"#"}
          >
            Contact Us
          </Link>
        </li>
      </ul>
    </div>
  );
}
