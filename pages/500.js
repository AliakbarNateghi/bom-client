import Link from "next/link";

export default function Custom500() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 digikala text-center">
          500
        </h1>
        <h1 className="text-4xl font-bold text-gray-800 mb-8 digikala text-center">
          .پاسخی از سمت سرور یافت نشد
        </h1>
        <p className="text-gray-600 mb-6 text-center digikala">
          .لطفا بعدا دوباره تلاش کنید و مشکل را گزارش دهید
        </p>
        <Link
          href="/"
          className="inline-block py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold digikala"
        >
          بازگشت ب صفحه اصلی
        </Link>
      </div>
    </div>
  );
}
