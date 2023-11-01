import Image from "next/image";
import { AuthForm } from "./_components/AuthForm";
  
export default function Home() {
  return (
    <div className="bg-gray-100 h-screen w-screen items-center justify-center flex flex-col">
      <div className="flex items-center justify-center flex-col space-y-3 px-4">
        <Image src="/logo.png" alt="Logo" width={48} height={48} />
        <h2 className="text-xl sm:text-3xl font-bold text-center">
          Sign in to your account
        </h2>
      </div>
      <div className="xs:w-[350px] sm:w-[400px] md:w-[450px] lg:w-[500px] flex-col space-y-4 rounded-md items-center justify-center flex bg-white p-10 mt-8">
        <AuthForm />
      </div>
    </div>
  );
}
