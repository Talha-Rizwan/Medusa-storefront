import { useEffect,useState} from "react"
import { MEDUSA_BACKEND_URL, queryClient } from "@lib/config"
import { AccountProvider } from "@lib/context/account-context"
import { CartDropdownProvider } from "@lib/context/cart-dropdown-context"
import { MobileMenuProvider } from "@lib/context/mobile-menu-context"
import { StoreProvider } from "@lib/context/store-context"
import { CartProvider, MedusaProvider } from "medusa-react"
import { Hydrate } from "react-query"
import "styles/globals.css"
import "styles/preview.css"
import { AppPropsWithLayout } from "types/global"
import { appWithTranslation } from 'next-i18next'

function App({
  Component,
  pageProps,
}: AppPropsWithLayout<{ dehydratedState?: unknown }>) {
  const getLayout = Component.getLayout ?? ((page) => page)


//getting the current location of the user for shipping purposes
//using ipinfo api

// const [location, setLocation] = useState([])
//   const fetchLocation = async () => {
//     // const my_api=process.env.IPINFO_TOKEN

//     // let url = "https://ipinfo.io/json?token=";
//     // url+=my_api;

//   // this api is right now using my confidential api token
//     const url = 'https://ipinfo.io/json?token=044426a2a87cd1'

//     const response = await fetch(url)
//     if (!response.ok) {

//       throw new Error('Location coud not be fetched!')
//     } else {
//       return response.json()
//     }
//   }
//   useEffect(() => {
//     fetchLocation()
//       .then((res) => {
//         setLocation(res)
//         })
//       .catch((e) => {
//         console.log(e.message)
//       })
//   }, [])


//   console.warn("the location is : ",location?.country);

  return (
    <MedusaProvider
      baseUrl={MEDUSA_BACKEND_URL}
      queryClientProviderProps={{
        client: queryClient,
      }}
    >
      <Hydrate state={pageProps.dehydratedState}>
        <CartDropdownProvider>
          <MobileMenuProvider>
            <CartProvider>
              <StoreProvider>
                <AccountProvider>
                  {getLayout(<Component {...pageProps} />)}
                </AccountProvider>
              </StoreProvider>
            </CartProvider>
          </MobileMenuProvider>
        </CartDropdownProvider>
      </Hydrate>
    </MedusaProvider>
  )
}

export default appWithTranslation(App)