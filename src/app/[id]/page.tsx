export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const imgName = Buffer.from(id, "hex").toString("utf-8");
  const prompt = imgName
    .split("_")
    .shift()
    ?.toString()
    .replace(/\.[^/.]+$/, "");
  return (
    <div className="mx-auto mb-12 max-w-screen-3xl">
      <div className="m-10 text-center">
        <h1 className="mb-4 text-3xl font-bold">{prompt}</h1>
      </div>
    </div>
  );
}
