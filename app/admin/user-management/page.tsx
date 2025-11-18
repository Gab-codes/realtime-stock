import UserTable from "@/components/admin/user-management/UserTable";
import { getAllUsersData } from "@/lib/actions/user.action";

const UserManagement = async () => {
  const data = await getAllUsersData();
  const allUsersData = data.success ? data.data : [];

  return (
    <>
      <UserTable usersData={allUsersData} />
    </>
  );
};

export default UserManagement;
