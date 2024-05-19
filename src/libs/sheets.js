export const sheets = async () => {
  const documentID = process.env.DOCUMENT_ID;
  const tableId = process.env.TABLE_ID;
  const res = await fetch(
    `https://docs.google.com/spreadsheets/d/${documentID}/gviz/tq?tqx=out:csv&gid=${tableId}`,
    { cache: "no-cache" }
  );
  const text = await res.text();
  const csv = text
    .split("\n")
    .slice(1)
    .map((row) => {
      const [
        inscriptionDate,
        email,
        name,
        paterno,
        materno,
        ci,
        modules,
        course,
      ] = row.split(",");
      return {
        ci,
        name,
        paterno,
        materno,
        course,
        modules,
        email,
        inscriptionDate,
      };
    });

  const data = csv.map((obj) => {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, value.replace(/"/g, "")])
    );
  });
  return data;
};
