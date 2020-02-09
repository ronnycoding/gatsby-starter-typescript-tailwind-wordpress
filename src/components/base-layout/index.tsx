import React from "react"

import Header from '../header'

interface BaseLayoutProp {
  children: JSX.Element
}

const BaseLayout = ({ children }: BaseLayoutProp) => {
  return (
      <div className={`min-h-screen bg-gray-100 flex flex-col`}>
        <Header />
        {children}
      </div>
    )
}

export default BaseLayout