import { Route } from "@/interfaces/interfaces";
import { FC, useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { ApplicationLogo } from "../ui/ApplicationLogo";
import { NavigationLink } from "./NavigationLink";
import { ResponsiveButton } from "./ResponsiveButton";
import { NavigationContext, NavigationProvider } from "./context/NavigationContext";
import { ResponsiveNavigationLink } from "./ResponsiveNavigationLink";

interface Props {
  links: Route[]
}

export const Navigation:FC<Props> = ({ links }) => {
  return (
    <NavigationProvider>
      <Child links={links} />
    </NavigationProvider>
  )
}


const Child:FC<Props> = ({ links }) => {

  const { isOpen } = useContext(NavigationContext)

  return (
    <header className="relative py-2 px-4 sm:px-8 bg-gray-200">
      <div className="container xl:max-w-6xl mx-auto flex gap-4 sm:gap-8 justify-between items-center">
        <Link 
          to='/'
          className="flex items-center gap-4"
        >
          <ApplicationLogo />
        </Link>

        <div className="sm:hidden">
          <ResponsiveButton />
        </div>
        

        <nav className="hidden sm:flex gap-8">
          { links.map(l =>  <NavigationLink key={l.to} {...l} /> ) }
        </nav>

        {/* Sign In | Sign Up */}
        {/* User */}
      </div>

      {
        isOpen &&
        <nav className="absolute sm:hidden top-full right-0 w-4/5 max-w-xs shadow shadow-[rgba(0,0,0,0.25)] bg-gray-200 focus:bg-orange-500 focus:text-white">
          { links.map(l => <ResponsiveNavigationLink key={l.to} {...l} /> ) }
        </nav>
      }
    </header>
  )
}

