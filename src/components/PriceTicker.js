
function toBanglaNumber(value) {
  return String(value).replace(/[0-9]/g, (digit) =>
    "০১২৩৪৫৬৭৮৯"[Number(digit)]
  );
}

export default function PriceTicker({ products = [] }) {
  const items = [...products, ...products];

  return (
    <div className="overflow-hidden bg-green-950 py-3 text-white">
      <div className="ticker-track flex w-max items-center">
        {items.map((product, index) => {
          const isUp = product.change?.dir === "up";
          const isDown = product.change?.dir === "down";

          return (
            <div
              key={`${product.id}-${index}`}
              className="flex shrink-0 items-center gap-3 px-7 text-sm"
            >
              <span>{product.image}</span>

              <span className="font-medium">
                {product.nameBn}
              </span>

              <span>
                {toBanglaNumber(product.today)} টাকা
              </span>

              <span
                className={
                  isUp
                    ? "text-green-300"
                    : isDown
                    ? "text-red-300"
                    : "text-gray-300"
                }
              >
                {isUp ? "▲" : isDown ? "▼" : "—"}
                {" "}
                {toBanglaNumber(Math.abs(product.change?.pct || 0))}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
