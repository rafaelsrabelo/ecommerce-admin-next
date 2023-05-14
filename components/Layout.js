import { useSession, signIn, signOut } from "next-auth/react"
import Nav from "@/components/Nav";

export default function Layout({children}) {
  const { data: session } = useSession();
  if(!session) {
    return (
      <div className='bg-gray-900 w-screen flex items-center h-screen'>
        <div className="text-center w-full">
          <button onClick={() => signIn('google')} className="bg-white p-2 px-4 rounded-lg">
            Login with Google
          </button>
        </div>
      </div>
    );
  }

return (
  <div className="bg-gray-900 min-h-screen flex">
    <Nav />
    <div className="bg-white flex-grow mt-2 mr-2 mb-0 rounded-lg p-4">{children}</div>
    {/* <button onClick={() => { signOut()}} className="bg-red-500 text-white p-2 px-4 rounded-lg">Sair</button> */}
  </div>
)
}