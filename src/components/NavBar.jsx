import React from 'react'

export default function NavBar() {
  return (
    <div data-testid="navbar">
      <nav
        className="flex items-center justify-between flex-wrap bg-midnight-blue p-6"
      >
        <div
          className="flex items-center flex-shrink-0 text-white mr-6"
        >
          <svg
            data-testid="logo"
            xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 40 32"
            className="fill-slate-300"
          >
            <path d="M31.937 9.287c-0.011 0-0.016-0.005-0.020-0.005-0.011 0-0.021 0.005-0.032 0.011-20.172 2.031-29.651 10.801-31.885 12.959l0.297 0.468h3.525c9.161-9.213 21.541-12.271 28.089-13.276l0.005 0.005c0.004 0 0.009-0.011 0.015-0.011 0.037-0.005 0.068-0.036 0.068-0.077 0-0.037-0.027-0.063-0.063-0.073zM0.505 14.011l-0.213 0.401 4.328 3.156c0.875-0.511 1.771-0.984 2.683-1.432l-2.901-2.125zM10.125 18.197c-0.719 0.532-1.448 1.095-2.235 1.756l3.803 2.765h3.943l0.167-0.359z"/>
          </svg>
          <span
            className="font-semibold text-xl text-slate-300 tracking-tight"
          >
            Spaceship Database App
          </span>
        </div>
      </nav>
    </div>
  )
}