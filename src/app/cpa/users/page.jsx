import Users from "@/ui/cpa/users/users";

const UsersPage = ({searchParams}) => {
  return (
    <div>
      <h3>UsersPage</h3>
      <Users searchParams={searchParams} />
    </div>
  );
};

export default UsersPage;
