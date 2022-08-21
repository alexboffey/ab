import { MdOutlineCatchingPokemon } from "react-icons/md";
import { MdAccountBalanceWallet } from "react-icons/md";
import { GiPokecog } from "react-icons/gi";
import { RiUser3Fill } from "react-icons/ri";
import { TbHash } from "react-icons/tb";

const icons = {
  pokeball: MdOutlineCatchingPokemon,
  pokecog: GiPokecog,
  user: RiUser3Fill,
  hash: TbHash,
  qty: MdAccountBalanceWallet,
};

export const Icon: React.FC<{
  name: keyof typeof icons;
  className?: string;
}> = ({ name, className }) => {
  const Component = icons[name];
  return <Component className={className} />;
};
