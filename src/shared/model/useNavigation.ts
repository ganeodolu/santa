import { useRouter } from "next/router";

export const useNavigation = () => {
  const router = useRouter();

  const navigateTo = (path: string) => {
    router.push(path);
  };

  return { navigateTo };
};
