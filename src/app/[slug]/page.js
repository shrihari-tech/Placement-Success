import Link from "next/link";

export default function PageNotFound(){
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <p className="mt-2 text-gray-800">The page you are looking for is under Developing...</p>
                <div className="mt-5"><Link href="/" className="text-blue-900 hover:underline mt-7">Back to Login</Link></div>
            </div>
        </div>
    )
}
