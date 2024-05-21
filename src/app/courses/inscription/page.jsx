import Inscription from "@/ui/courses/inscription/inscription";

const InscriptionPage = async ({ searchParams }) => {
  return (
    <div>
      <h3>InscriptionPage</h3>
      <Inscription searchParams={searchParams} />
    </div>
  );
};

export default InscriptionPage;
