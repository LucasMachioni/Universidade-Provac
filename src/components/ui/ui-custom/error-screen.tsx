import { HiExclamationCircle } from "react-icons/hi";

type ErrorScreenProps = {
  message?: string;
  onRetry?: () => void;
};

export const ErrorScreen = ({
  message = "Erro inesperado.",
  onRetry,
}: ErrorScreenProps) => {
  return (
    <main className="flex h-screen justify-center items-start pt-32">
      <div className="flex flex-col justify-center items-center gap-4 text-center">
        <HiExclamationCircle className="w-24 h-24 text-red-400" />
        <h1 className="text-xl font-semibold text-white max-w-md">{message}</h1>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-4 px-6 py-2 rounded-md bg-red-600 text-white hover:bg-red-500 transition"
          >
            Tentar novamente
          </button>
        )}
      </div>
    </main>
  );
};
