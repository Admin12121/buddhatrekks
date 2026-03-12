import Link from "next/link";
import { FlickeringGrid } from "./flickering-grid";
import Image from "next/image";
import CenterUnderline from "@/components/animation/underline-center";

const Footer = () => {
  return (
    <footer className="footer-area style-one position-relative z-1 pt-5! pb-75! bg-[#f8fafb]">
      <div className="container-fluid z-100 relative">
        <div className="row">
          <Link href="/">
            <Image src="/images/logo.svg" alt="Logo" width={120} height={26} />
          </Link>
        </div>
      </div>
      <FlickeringGrid
        className="absolute inset-0 z-0"
        squareSize={3}
        gridGap={3}
        color="#2651fd"
        backgroundOpacity={0.15}
        maxOpacity={0.7}
        flickerChance={0.3}
        logoText="Buddha Trekks"
        faded={true}
      />
      <span className="text-center bottom-0 m-0 absolute transform -translate-x-[50%] left-1/2 ">
        Designed and developed by{" "}
        <Link
          href="https://admin12121.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <CenterUnderline>Admin12121</CenterUnderline>
        </Link>
      </span>
    </footer>
  );
};

export default Footer;
