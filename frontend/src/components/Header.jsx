import { motion } from "framer-motion";
import { Github } from "lucide-react";

const Header = () => {
  return (
    <motion.header 
      className="bg-gradient-to-r from-red-700 to-red-600 text-white shadow-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <motion.h1 
              className="text-3xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              SecuriHeader
            </motion.h1>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex space-x-4"
          >
            <motion.a
              href="https://github.com/chrismat-05/SecuriHeader"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-white text-red-600 px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="mr-2" size={20} />
              Star on GitHub
            </motion.a>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;