import Bitacora from "@/ui/cpa/bitacora/bitacora";

const AdminDashboard = ({ searchParams }) => {
  return (
    <div>
      <h3>AdminDashboard</h3>
      <Bitacora searchParams={searchParams} />
    </div>
  );
};

export default AdminDashboard;
