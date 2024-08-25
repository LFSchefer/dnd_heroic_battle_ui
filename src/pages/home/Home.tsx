import React from "react";
import { FormattedMessage } from "react-intl";

export default function Home() {

  return (
    <>
    <h1 className="text-xl">
      <FormattedMessage id="test"/>
    </h1>
    <button className="py-2 px-3 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold rounded-md shadow focus:outline-none test">coucou</button>
    </>
  )
}
