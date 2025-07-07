import Link from "next/link";

export default function PageNotFound(){
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-red-600">404</h1>
                <p className="mt-4 text-xl text-black">Page Not Found</p>
                <p className="mt-2 text-gray-800">The page you are looking for does not exist.</p>
                <div className="mt-5"><Link href="/" className="text-blue-900 hover:underline mt-7">Back to Login</Link></div>
            </div>
        </div>
    )
}
