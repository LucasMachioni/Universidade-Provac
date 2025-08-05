import { LoginCard } from "@/components/ui/ui-custom/login-card";

export const Login = () => {
  return (
    <main className="min-h-screen flex justify-center">
      <div className="mt-50 flex flex-col max-h-[500px] w-full max-w-md items-center">
        <LoginCard />
      </div>
    </main>
  );
};
