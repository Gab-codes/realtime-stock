"use client";

import UserTable from "@/components/admin/user-management/UserTable";
import { getAllUsersData } from "@/lib/actions/user.action";
import { useQuery } from "@tanstack/react-query";

const UserManagement = () => {
  const {
    data: allUserData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-users"],
    queryFn: getAllUsersData,
  });

  const data = allUserData?.success ? allUserData.data : [];
  if (isLoading) return <p>Loading users...</p>;

  return <UserTable usersData={data} refetchUsers={refetch} />;
};

export default UserManagement;
