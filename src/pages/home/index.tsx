import { LoginCard } from "@/components/ui/ui-custom/login-card";

export const Home = () => {
  return (
    <main className="min-h-screen flex justify-center">
      <div className="mt-20 flex max-h-[500px] w-full max-w-md">
        <LoginCard />
      </div>
    </main>
  );
};
