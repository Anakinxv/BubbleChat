import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/app/actions/userActions/userinfo-action";

export function useUserInfo(userId: string) {
  return useQuery({
    queryKey: ["userInfo", userId],
    queryFn: () => getUserInfo(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
