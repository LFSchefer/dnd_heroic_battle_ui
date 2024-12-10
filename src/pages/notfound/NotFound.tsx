import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router";

export default function NotFound() {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/")
  }

  return (
<main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
  <div className="text-center">
    <p className="text-4xl font-semibold text-cyan-500">404</p>
    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
      < FormattedMessage id="404"/>
    </h1>
    <p className="mt-6 text-base leading-7 text-gray-600">
      < FormattedMessage id="pageNotFound"/>
    </p>
    <div className="mt-10 flex items-center justify-center gap-x-6">
      <button onClick={handleClick}
      className="rounded-md bg-cyan-500 hover:bg-cyan-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        < FormattedMessage id="backHome"/>
      </button>
    </div>
  </div>
</main>
  )
}
