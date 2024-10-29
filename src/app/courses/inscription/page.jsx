import Inscription from "@/ui/courses/inscription/inscription";

const InscriptionPage = async ({ searchParams }) => {
  return (
    <div>
      <Inscription searchParams={searchParams} />
    </div>
  );
};

export default InscriptionPage;
