import Bitacora from "@/ui/cpa/bitacora/bitacora";

const LogPage = ({ searchParams }) => {
  return (
    <div>
      <h1>LogPage</h1>
      <Bitacora searchParams={searchParams} />
    </div>
  );
};

export default LogPage;
