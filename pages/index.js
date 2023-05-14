import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";

export default function Home() {
  const {data: session} = useSession();
  return (
    <Layout>
      <div className="text-gray-900 flex justify-between">
        <h2 className="text-4xl font-medium text-gray-900 dark:text-white">
          Hello, <strong>{session?.user?.name}</strong>
        </h2>
        <div className="flex items-center justify-center bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
          <img src={session?.user?.image} className="w-10 h-10 rounded " alt="" />
          <div className="py-0">
          <p className="px-2">
            {session?.user?.name}
          </p>
          <small className="px-2">{session?.user?.email}</small>
          </div>
        </div>
      </div>
    </Layout>
  )
}
