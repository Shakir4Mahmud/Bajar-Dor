export default function ProductSkeleton() {
  const cards = [1, 2, 3, 4, 5, 6];

  return (
    <div className="max-w-6xl mx-auto px-4 pb-10">
      <div className="skeleton h-6 w-40 mb-3"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((number) => (
          <div key={number} className="skeleton h-28 w-full rounded-2xl"></div>
        ))}
      </div>
    </div>
  );
}