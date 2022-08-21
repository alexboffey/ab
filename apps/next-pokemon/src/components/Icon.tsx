import { MdOutlineCatchingPokemon } from "react-icons/md";

const icons = {
  pokeball: MdOutlineCatchingPokemon,
};

export const Icon: React.FC<{
  name: keyof typeof icons;
  className?: string;
}> = ({ name, className }) => {
  const Component = icons[name];
  return <Component className={className} />;
};
