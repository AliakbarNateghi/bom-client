import Link from "next/link";

export default function Custom404() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 digikala text-center">
          404
        </h1>
        <h1 className="text-4xl font-bold text-gray-800 mb-8 digikala text-center">
          صفحه مورد نظر یافت نشد
        </h1>
        <p className="text-gray-600 mb-6 text-center digikala">
          ممکن است صفحه مورد نظر شما حذف شده باشد یا نام آن تغییر کرده باشد و یا
          موقتا از دسترس خارج باشد
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
