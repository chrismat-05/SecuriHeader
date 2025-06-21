import { motion } from "framer-motion";
import { Github } from "lucide-react";

const Header = () => {
  return (
    <motion.header
      className="bg-gradient-to-tr from-emerald-950 via-emerald-950 to-green-700 text-white shadow-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto max-w-6xl px-4 py-5 flex justify-between items-center">
        <motion.h1
          className="text-3xl md:text-4xl font-bold tracking-tight drop-shadow-sm flex items-center space-x-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-white">Securi</span>
          <span className="bg-gradient-to-r from-lime-400 via-emerald-400 to-green-700 text-transparent bg-clip-text">
            Header
          </span>
        </motion.h1>



        <motion.a
          href="https://github.com/chrismat-05/SecuriHeader"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-white text-green-700 px-4 py-2 rounded-md shadow hover:bg-gray-100 transition font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Github className="mr-2" size={20} />
          Star on GitHub
        </motion.a>
      </div>
    </motion.header>
  );
};

export default Header;
