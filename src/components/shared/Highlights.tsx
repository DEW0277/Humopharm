import { items } from "@/constants";

export default function Highlights() {
  return (
    <section id="about" className="container mx-auto px-4 py-16 space-y-16">
      {items.map((it, idx) => (
        <div
          key={idx}
          className={`grid md:grid-cols-2 gap-10 items-center ${
            idx % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
          }`}
        >
          <img src={it.img} className="rounded-2xl shadow-lg" />
          <div>
            <h3 className="text-2xl font-bold">{it.title}</h3>
            <p className="mt-3 text-muted-foreground">{it.desc}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
