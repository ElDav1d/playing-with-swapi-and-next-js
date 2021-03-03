import Link from "next/Link";
import Logo from "../../atoms/Logo/Logo";

const LogoLink = () => {
  return (
    <Link href="/">
      <a>
        <Logo />
      </a>
    </Link>
  );
};

export default LogoLink;
