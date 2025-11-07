/** @format */

interface CardProps {
  title: string;
  image: string;
}

export function HeroCard({title, image}: CardProps) {
  return (
    <div className="bg-[#ffffff40] shadow-xl shadow-gray-500 rounded-2xl flex flex-col items-center w-[200px] p-5 ">
      <div className="rounded-2xl overflow-hidden">
        <img className="h-full w-full object-cover" src={image} alt="image" />
      </div>
      <div className="text-center font-bold mt-2">{title}</div>
    </div>
  );
}
