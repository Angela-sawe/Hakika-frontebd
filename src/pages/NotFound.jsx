import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <h1 className="text-3xl font-extrabold">Page not found</h1>
      <Link to="/" className="mt-4 inline-block font-semibold underline">Back to the home page</Link>
    </div>
  );
}
