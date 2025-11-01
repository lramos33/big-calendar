import { useRouter, useSearchParams } from "next/navigation";

export function useSearchParamsSetter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function setSearchParams(params: Record<string, string | null>) {
    const currentParams = new URLSearchParams(Array.from(searchParams.entries()));

    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        currentParams.delete(key);
      } else {
        currentParams.set(key, value);
      }
    });

    router.push(`?${currentParams.toString()}`);
  }

  return setSearchParams;
}