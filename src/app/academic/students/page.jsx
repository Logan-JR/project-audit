import Kardex from "@/ui/academic/kardex/kardex";

const StudentsPage = ({ searchParams }) => {
  return (
    <div>
      <Kardex searchParams={searchParams} />
    </div>
  );
};

export default StudentsPage;
