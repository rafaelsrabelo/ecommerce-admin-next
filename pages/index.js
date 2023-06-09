import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <Layout>
      <div className="text-gray-900 flex justify-between">
        <div>

          <h2 className="text-4xl font-medium text-gray-700 dark:text-white">
            Olá, <strong>{session?.user?.name}</strong>
          </h2>
          <p className="lead">
            Este é o painel de controle da sua loja.
          </p>
        </div>
        <div className="flex items-center text-center bg-gray-300 gap-1 text-gray-900 rounded-lg overflow-hidden hidden sm:block pb-4">
          <img src={session?.user?.image} className="w-full h-36 rounded" alt="" />
          <div className="">
            <p className="px-2">
              <strong>
                {session?.user?.name}
              </strong>
            </p>
            <small className="px-2">{session?.user?.email}</small>
          </div>
        </div>
      </div>
    </Layout>
  )
}
