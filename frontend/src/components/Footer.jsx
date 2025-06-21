import { motion } from "framer-motion";
import { Github, AlertCircle } from "lucide-react";

const Footer = () => {
  return (
    <motion.footer
      className="bg-red-900 text-white py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-3 md:mb-0 text-center md:text-left">
            <p className="text-red-300 text-sm">
              © 2025 SecuriHeader. Open source under MIT license.
            </p>
            <p className="text-red-300 text-sm mt-1">
              Built by{" "}
              <a
                href="https://thecma.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:underline"
              >
                CMA
              </a>
            </p>
          </div>
          
          <div className="flex space-x-4">
            <motion.a
              href="https://github.com/chrismat-05/SecuriHeader"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-red-300 hover:text-white transition text-sm"
              whileHover={{ scale: 1.05 }}
            >
              <Github className="mr-1" size={16} />
              GitHub
            </motion.a>
            
            <motion.a
              href="https://github.com/chrismat-05/SecuriHeader/issues/new"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-red-300 hover:text-white transition text-sm"
              whileHover={{ scale: 1.05 }}
            >
              <AlertCircle className="mr-1" size={16} />
              Report Issue
            </motion.a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;