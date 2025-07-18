import react from "react";
import { ArrowRight, Link } from "lucide-react";
import { NavLink } from "react-router";
import {
  SiCodepen,
  SiFacebook,
  SiGithub,
  SiInstagram,
  SiLinkedin as Linkedin,
  SiX,
} from "react-icons/si";
import { FaSearch } from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi2";
import { RiContactsBook3Line } from "react-icons/ri";
import SecondaryBtn from "./Button/SecondaryBtn";
import { motion } from "framer-motion";
import { slideLeft, slideRight, slideUp } from "../Utility/animation";

export const languages = ["En", "Es", "Fr", "De", "Ru"];

export const footerLinks = [
  { label: "Browse Posts", href: "/all-posts", icon: <FaSearch /> },
  { label: "About Us", href: "/about", icon: <HiOutlineUsers /> },
  { label: "Contact", href: "/contact", icon: <RiContactsBook3Line /> },
];

export const socials = [
  { href: "", icon: <SiGithub /> },
  { href: "", icon: <SiCodepen /> },
  { href: "", icon: <Linkedin /> },
  { href: "", icon: <SiFacebook /> },
];

const Footer = () => {
  return (
    <footer>
      <div className="w-full flex items-center justify-center bg-zinc-100 res-pad pt-16 pb-6">
        <div className="w-full flex flex-col">
          <motion.div
            {...slideRight(0)}
            className="w-full h-full text-7xl font-bold"
          >
            <h1 className="zain opacity-50 flex gap-4">
              <span className="text-7xl md:text-9xl xl:text-[14rem] leading-10 xl:leading-[10rem] tracking-tighter text-pink-700">
                Medi
              </span>
              <span className="text-7xl md:text-9xl xl:text-[14rem] leading-10 xl:leading-[10rem] text-sky-600 -ml-2">
                Rally
              </span>
            </h1>
          </motion.div>

          <motion.div {...slideRight(0.1)}>
            <p className="w-full md:w-md text-gray-600">
              Medi Rally is a platform that allows users to share their
              bootcamps and events with the world.
            </p>
          </motion.div>

          <motion.div {...slideUp(0.2)} className="flex flex-col">
            <div className="flex flex-col md:my-8 md:flex-row justify-between py-2">
              <div className="logo self-center">
                <SecondaryBtn
                  label="Contact US"
                  icon={ArrowRight}
                  iconProps={{ size: 18 }}
                  className="w-fit py-2 flex items-center"
                ></SecondaryBtn>
              </div>

              <div className="navMenu self-start md:self-end lg:justify-self-end">
                <ul className="text-sm font-medium flex flex-col md:flex-row md:items-center gap-3">
                  {footerLinks.map((link, index) => (
                    <li key={index}>
                      <NavLink
                        to={link.href}
                        className={({ isActive }) =>
                          `flex items-center gap-2 px-3 py-3 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-zinc-400 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] rounded-md transition-all ease-in-out duration-300 
                            ${
                              isActive
                                ? "active"
                                : "hover:after:origin-bottom-left hover:after:scale-x-100 after:origin-bottom-right after:scale-x-0"
                            }`
                        }
                      >
                        {link.icon} {link.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="social-icon self-center justify-self-end py-4">
                <ul className="flex flex-row md:items-center gap-4">
                  {socials.map((item, index) => (
                    <li key={index} className="cursor-pointer bg-transparent">
                      <a
                        href={item.href}
                        className="transition-color h-full w-full text-sky-600 duration-300 hover:text-pink-700"
                      >
                        {item.icon}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <hr className="border-gray-600" />
            <p className="w-full text-center my-6 text-gray-600">
              Copyright © 2025 Medi Rally
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
