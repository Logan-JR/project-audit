import Curso from "@/ui/courses/curso/curso";
const CursoPage = ({ searchParams }) => {
  return (
    <div>
      <h3>CursoPage</h3>
      <Curso searchParams={searchParams} />
    </div>
  );
};

export default CursoPage;
