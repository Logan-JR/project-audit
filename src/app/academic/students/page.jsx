import Kardex from "@/ui/academic/kardex/kardex";

const StudentsPage = ({ searchParams }) => {
  return (
    <div>
      <h3>Kardex Academico</h3>
      <Kardex searchParams={searchParams} />
    </div>
  );
};

export default StudentsPage;
