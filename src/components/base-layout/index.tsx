import React from "react"

import Header from '../header'

interface BaseLayoutProp {
  children: JSX.Element
}

const BaseLayout = ({ children }: BaseLayoutProp) => {
  return (
      <div className={`min-h-screen bg-gray-100`}>
        <Header />
        <div className={`flex flex-col items-center mt-5`}>
          {children}
        </div>
      </div>
    )
}

export default BaseLayout