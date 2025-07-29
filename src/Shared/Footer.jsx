import react from "react";
import { ArrowRight, Link } from "lucide-react";
import { NavLink } from "react-router";
import {
  SiCodepen,
  SiFacebook,
  SiGithub,
  SiLinkedin as Linkedin,
} from "react-icons/si";
import { FaSearch, FaUserFriends, FaAddressBook } from "react-icons/fa";
import SecondaryBtn from "./Button/SecondaryBtn";
import { motion } from "framer-motion";
import { slideRight, slideUp } from "../Utility/animation";

export const languages = ["En", "Es", "Fr", "De", "Ru"];

export const footerLinks = [
  { label: "Available Camps", href: "/all-camps", icon: <FaSearch /> },
  { label: "About Us", href: "/about", icon: <FaUserFriends /> },
  { label: "Contact", href: "/contact", icon: <FaAddressBook /> },
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
                Medi Rally
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
            <div className="flex flex-col md:my-8 md:flex-row justify-between py-2 gap-4">
              <div className="logo self-center">
                <SecondaryBtn
                  label="Contact US"
                  icon={ArrowRight}
                  iconProps={{ size: 18 }}
                />
              </div>

              <div className="navMenu self-start md:self-end lg:justify-self-end">
                <ul className="w-full text-sm font-medium flex flex-col md:flex-row md:items-center items-start gap-3">
                  {footerLinks.map((link, index) => (
                    <li key={index}>
                      <NavLink
                        to={link.href}
                        className="flex justify-between items-center gap-2 px-2 group"
                      >
                        {({ isActive }) => (
                          <>
                            <span
                              className={`text-lg ${
                                isActive
                                  ? "text-rose-500"
                                  : "text-zinc-400 group-hover:text-rose-500"
                              }`}
                            >
                              {link.icon}
                            </span>
                            <span className="text-sm font-medium">
                              {link.label}
                            </span>
                          </>
                        )}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="social-icon self-center justify-self-end pb-4">
                <ul className="flex flex-row md:items-center gap-4">
                  {socials.map((item, index) => (
                    <li key={index} className="cursor-pointer bg-transparent">
                      <a
                        href={item.href}
                        className="transition-color ease-in-out text-pink-700 duration-300 hover:text-pink-800 text-lg"
                      >
                        {item.icon}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <hr className="border-zinc-400" />
            <p className="w-full text-center my-6 text-zinc-800 lexend text-sm">
              Copyright © 2025 Medi Rally
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
