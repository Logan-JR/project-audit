import Curso from "@/ui/courses/curso/curso";
const CursoPage = ({ searchParams }) => {
  return (
    <div>
      <Curso searchParams={searchParams} />
    </div>
  );
};

export default CursoPage;
