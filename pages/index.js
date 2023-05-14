import { useSession, signIn, signOut } from "next-auth/react"
export default function Home() {
  const { data: session } = useSession();
  if(!session) {
    return (
      <div className='bg-blue-900 w-screen flex items-center h-screen'>
        <div className="text-center w-full">
          <button onClick={() => signIn('google')} className="bg-white p-2 px-4 rounded-lg">
            Login with Google
          </button>
        </div>
      </div>
    );
  }

return (
  <div>
    <p>logged in {session.user.email}</p>
    <button onClick={() => { signOut()}} className="bg-red-500 text-white p-2 px-4 rounded-lg">Sair</button>
  </div>
)
}
