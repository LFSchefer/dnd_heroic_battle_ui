import { FC } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router";

const NotFound: FC = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/")
  }

  return (
<main className="grid place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 h-screen">
  <div className="text-center">
    <p className="text-4xl font-semibold text-cyan-600">404</p>
    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
      < FormattedMessage id="404"/>
    </h1>
    <p className="mt-6 text-base leading-7 text-gray-600">
      < FormattedMessage id="pageNotFound"/>
    </p>
    <div className="mt-10 flex items-center justify-center gap-x-6">
      <button onClick={handleClick}
      className="dnd-btn">
        < FormattedMessage id="backHome"/>
      </button>
    </div>
  </div>
</main>
  )
}

export default NotFound;