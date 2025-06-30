export default function NotFound() {
    return (
        <div className="flex items-center justify-center px-4 w-full">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-xl text-gray-600 mb-6">אופס הדף לא נמצא.</p>
                <a
                    href="/"
                    className="inline-block px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition"
                >
                    חזרה לדף הבית
                </a>
            </div>
        </div>
    );
}