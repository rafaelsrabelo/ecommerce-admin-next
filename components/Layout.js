import { useSession, signIn } from "next-auth/react"
import Nav from "@/components/Nav";
import { useState } from "react";
import Logo from "./Logo";

export default function Layout({ children }) {
  const { data: session } = useSession();
  const [showNav, setShowNav] = useState(false);
  if (!session) {
    return (
      <div className='bg-white w-screen flex items-center h-screen'>
        <div className="text-center w-full block p-20">
              <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-black md:text-5xl lg:text-6xl dark:text-blue-700">
                Acesso Simples ao Sistema Admin
              </h1>
              <p className="mb-6 text-lg font-normal text-black lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Faça login com sua conta do Google para aproveitar o nosso sistema admin de ecommerce.
                Gerencie sua loja com facilidade e eficiência.
              </p>
              <div className="px-6 sm:px-0 max-w-sm m-auto">
                <button onClick={() => signIn('google')}
                  type="button"
                  className="items-center text-blue-700 border w-full  bg-[#fff] hover:bg-[#fff]/90 focus:ring-4 focus:outline-none focus:ring-[#1d4ed8]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#1d4ed8]/55 mr-2 mb-2">
                  <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                    <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                  </svg>Entrar com Google<div></div>
                </button>
              </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="block md:hidden flex items-center p-4">
        <button onClick={() => setShowNav(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
        </svg>
        </button>
        <div className="flex grow justify-center mr-6">
          <Logo />
        </div>
      </div>
      <div className="bg-blue-700 min-h-screen flex">
        <Nav show={showNav} />
        <div className="bg-white flex-grow p-4">{children}</div>
      </div>
    </div>
  )
}
