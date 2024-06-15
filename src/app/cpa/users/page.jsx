import Users from "@/ui/cpa/users/users";

const UsersPage = ({searchParams}) => {
  return (
    <div>
      <Users searchParams={searchParams} />
    </div>
  );
};

export default UsersPage;
