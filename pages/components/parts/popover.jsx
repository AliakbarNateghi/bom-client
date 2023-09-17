import Image from "next/image";
import Link from "next/link";
import test from "@/public/logos/question.jpeg";

export default function PopOver({}) {
  return (
    <div className="">
      <div
        data-popover
        id="popover-user-profile"
        role="tooltip"
        className="fixed bottom-4 right-4 inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-100 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600"
      >
        <div className="p-3">test</div>
      </div>
    </div>
  );
}
