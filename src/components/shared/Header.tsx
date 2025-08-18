import DesktopNav from "./DesktopNav";
import InfoBar from "./InfoBar";
import MobileNav from "./MobileNav";

function Header() {
  return (
    <header className="w-full relative">
      <InfoBar />
      <DesktopNav />
      <MobileNav />
    </header>
  );
}

export default Header;
