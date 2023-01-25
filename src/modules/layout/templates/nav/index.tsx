import { useMobileMenu } from "@lib/context/mobile-menu-context"
import Hamburger from "@modules/common/components/hamburger"
import CartDropdown from "@modules/layout/components/cart-dropdown"
import DropdownMenu from "@modules/layout/components/dropdown-menu"
import MobileMenu from "@modules/mobile-menu/templates"
import DesktopSearchModal from "@modules/search/templates/desktop-search-modal"
import clsx from "clsx"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import LocaleSwitcher from '../../../common/components/locale-switcher'
import { Wrapper,Content,Content1 } from './header.style'

import AnimatedLogo from '@modules/common/components/AnimatedLogo';

const Nav = () => {
  const { pathname } = useRouter()
  const [isHome, setIsHome] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  //useEffect that detects if window is scrolled > 5px on the Y axis
  useEffect(() => {
    if (isHome) {
      const detectScrollY = () => {
        if (window.scrollY > 5) {
          setIsScrolled(true)
        } else {
          setIsScrolled(false)
        }
      }

      window.addEventListener("scroll", detectScrollY)

      return () => {
        window.removeEventListener("scroll", detectScrollY)
      }
    }
  }, [isHome])

  useEffect(() => {
    pathname === "/" ? setIsHome(true) : setIsHome(false)
  }, [pathname])

  const { toggle } = useMobileMenu()

  return (
    <div
      className={clsx("sticky top-0 inset-x-0 z-50 group", {
        "!fixed": isHome,
      })}
    >
      <header
        className={clsx(
          "relative h-16 px-8 mx-auto transition-colors bg-transparent border-b border-transparent duration-200 group-hover:bg-[#FFFFFF36] group-hover:backdrop-blur-lg",
          {
            "!bg-white !border-gray-200": !isHome || isScrolled,
          }
        )}
      >
        <nav
          className={clsx(
            "text-gray-900 flex items-center justify-between w-full h-full text-small-regular transition-colors duration-200",
            {
              // this was text-white
              "text-gray-900 group-hover:text-gray-900": isHome && !isScrolled,
            }
          )}
        >
          <div className="flex-1 basis-0 h-full flex space-x-10 items-center">
            <div className='logo' >
              <Link href='/'>
                  <AnimatedLogo
                  // TODO: Fix this
                  containerStyles={{
                    height: "100%",
                    width: "120px",
                    cursor: "pointer",
                  }}                  
                  />
              </Link>
              
              </div>
              <div>
                <LocaleSwitcher/>
              </div>
              
          </div>
                 
          <div className="flex items-center h-full">
            <Content>
              <Link href="/account">
                <a>Auto Care</a>
              </Link>
              <Link href="/account">
                <a>Metal Coating</a>
              </Link>
              <Link href="/account">
                <a>Trading</a>
              </Link>        
            </Content>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
          <Content1>
            <div className="hidden small:flex items-center gap-x-6 h-full">
              {process.env.FEATURE_SEARCH_ENABLED && <DesktopSearchModal />}
              <Link href="/store">
                <a>Shop</a>
              </Link>
              <Link href="/wholesale/account">
              <a>Wholesale Account</a>
              </Link>
              <Link href="/account">
                <a>Account</a>
              </Link>
            </div>
            <CartDropdown />
            {/* <div className="flex-1 basis-0 h-full flex items-center"> */}
            <div className="block small:hidden">
              <Hamburger setOpen={toggle} />
            </div>
            {/* <div className="hidden small:block h-full">
              <DropdownMenu />
            </div> */}
          {/* </div> */}
            </Content1>
          </div>
        </nav>
        <MobileMenu />
      </header>
    </div>
  )
}

export default Nav
