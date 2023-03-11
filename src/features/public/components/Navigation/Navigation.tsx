import { Route } from "@/interfaces/interfaces";
import { FC } from "react";
import { Link } from "react-router-dom";
import { ApplicationLogo } from "../ui/ApplicationLogo";

interface Props {
  links: Route[]
}

export const Navigation:FC<Props> = ({ links }) => {

  

  return (
    <header className="py-2 px-4 sm:px-8 bg-gray-200">
      <div className="container xl:max-w-6xl mx-auto flex gap-4 sm:gap-8 items-center">
        <Link 
          to='/'
          className="flex items-center gap-4"
        >
          <ApplicationLogo />
          <span className="text-xl font-semibold text-gray-600">Coin App</span>
        </Link>

        <nav className="flex gap-8">
          {
            links.map(l => (
                <Link 
                  key={l.name} 
                  to={l.to!}
                  className="flex min-h-[48px] min-w-[48px] items-center"
                >
                  { l.name }
                </Link>
              ))
          }
        </nav>

        {/* Sign In | Sign Up */}
        {/* User */}
      </div>
    </header>
  )
}