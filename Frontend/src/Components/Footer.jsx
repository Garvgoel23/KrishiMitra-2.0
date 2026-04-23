import { FaPhoneAlt, FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaLeaf } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
    return (
        <footer className="w-full bg-primary text-primary-foreground py-10 sm:py-12 px-4 shadow-inner mt-auto relative overflow-hidden">
            {/* Decorative floating circles */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-primary-foreground/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-primary-foreground/5 rounded-full translate-x-1/3 translate-y-1/3"></div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 relative z-10">
                {/* Brand */}
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-3 sm:space-y-4">
                    <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.03 }}>
                        <div className="bg-primary-foreground/20 p-2 rounded-full">
                            <FaLeaf className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">KrishiMitra</h2>
                    </motion.div>
                    <p className="text-xs sm:text-sm text-primary-foreground/75 max-w-xs">
                        Empowering farmers with AI-driven insights for soil, weather, pest detection, and government schemes.
                    </p>
                </div>

                {/* Contact */}
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-3 sm:space-y-4">
                    <h3 className="text-sm sm:text-base font-semibold uppercase tracking-wider">Contact Us</h3>
                    <div className="space-y-2 text-primary-foreground/85 text-xs sm:text-sm">
                        <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3">
                            <FaPhoneAlt className="text-primary-foreground/60 flex-shrink-0" />
                            <p>+91 98100 85872</p>
                        </div>
                        <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3">
                            <FaEnvelope className="text-primary-foreground/60 flex-shrink-0" />
                            <p>support@krishimitra.in</p>
                        </div>
                    </div>
                </div>

                {/* Social */}
                <div className="flex flex-col items-center sm:items-start md:items-end space-y-3 sm:space-y-4">
                    <h3 className="text-sm sm:text-base font-semibold uppercase tracking-wider">Follow Us</h3>
                    <div className="flex gap-3 mt-1">
                        {[FaFacebook, FaTwitter, FaInstagram].map((Icon, i) => (
                            <motion.a
                                key={i}
                                href="#"
                                className="bg-primary-foreground/10 hover:bg-primary-foreground/25 p-2.5 sm:p-3 rounded-full transition-colors"
                                whileHover={{ scale: 1.15, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Icon size={16} className="sm:w-5 sm:h-5" />
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>

            <div className="border-t border-primary-foreground/15 mt-8 sm:mt-10 pt-4 sm:pt-6 text-center relative z-10">
                <p className="text-xs sm:text-sm text-primary-foreground/60">
                    &copy; {new Date().getFullYear()} KrishiMitra. Cultivating the future, naturally.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
