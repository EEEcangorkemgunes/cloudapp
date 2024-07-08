import { getAllUsers } from "@/lib/user";

const Page = async () => {
  const registeredUsers = await getAllUsers();
  return (
    <div className="flex flex-col">
      {registeredUsers.map((val) => (
        <div key={val.email}>
          <div>{val.email}{" "}</div>
          <div>{val.password}</div>
        </div>
      ))}
    </div>
  );
};

export default Page;
