import { Card, CardContent } from "../ui/card";

interface ICardProps {
  item: {
    title: string;
    desc: string;
    img: string;
  };
}

function AboutCard({ item }: ICardProps) {
  return (
    <Card className="border-none bg-gradient-to-b from-[#BD1033] to-[#FF5A64] min-w-[250px] rounded-xl px-6 py-4">
      <CardContent className="flex flex-col items-center justify-center gap-2.5">
        {item.img && <img src={item.img} alt={item.title} className="size-4 object-cover" />}
        <h3 className="text-white font-bold text-lg text-center">{item.title}</h3>
        <p className="text-white text-sm text-center">{item.desc}</p>
      </CardContent>
    </Card>
  );
}

export default AboutCard;
