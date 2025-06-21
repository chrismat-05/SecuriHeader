import { motion } from "framer-motion";
import { Github, AlertCircle, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <motion.footer
      className="bg-gradient-to-bl from-emerald-950 via-emerald-950 to-green-700 border-t border-green-100 text-gray-700 py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <div className="container mx-auto max-w-6xl px-4 flex flex-col text-base space-y-4 md:space-y-0">
        <div className="flex flex-col md:flex-row justify-between items-center w-full">
          <div className="flex items-center gap-2 text-white">
            Built by
            <a
              href="https://thecma.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-lime-100 flex items-center"
            >
              CMA <ExternalLink className="ml-2" size={18} />
            </a>
          </div>

          <div className="flex space-x-6 mt-3 md:mt-0">
            <motion.a
              href="https://github.com/chrismat-05/SecuriHeader"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-white hover:text-lime-100 transition"
              whileHover={{ scale: 1.1 }}
            >
              <Github className="mr-2" size={18} />
              GitHub
            </motion.a>

            <motion.a
              href="https://github.com/chrismat-05/SecuriHeader/issues/new"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-white hover:text-lime-200 transition"
              whileHover={{ scale: 1.1 }}
            >
              <AlertCircle className="mr-2" size={18} />
              Report Issue
            </motion.a>
          </div>
        </div>

        <div className="text-gray-400 text-xs text-center pt-4">
          © 2025 SecuriHeader. Open source under MIT license.
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
