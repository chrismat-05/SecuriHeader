import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section className="mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="bg-gradient-to-br from-green-700 via-emerald-950 to-emerald-950 border border-green-100 p-10 rounded-xl shadow-md"
      >
        <div className="flex flex-col md:flex-row items-center mb-10 gap-6 text-center md:text-left">
          <h2 className="text-4xl font-bold text-lime-100 justify-left">
            What is SecuriHeader?
          </h2>

          <div className="w-1 h-20 bg-gradient-to-b from-emerald-700 via-green-400 to-lime-700 rounded-full"></div>

          <p className="text-lg text-white leading-relaxed">
            <span className="font-semibold text-lime-300">SecuriHeader</span> is a{" "}
            <span className="font-bold text-lime-200">free, open-source</span> tool that checks your website’s HTTP response headers for potential vulnerabilities and missing security protections.
          </p>
        </div>

        <motion.div
        whileHover={{
            scale: 1.02,
            boxShadow: "0px 8px 20px rgba(200, 255, 200, 0.2)",
        }}
        transition={{ type: "spring", stiffness: 120, damping: 10 }}
        className="bg-gradient-to-br from-emerald-950 via-emerald-950 to-green-700 border-l-4 border-green-400 p-5 rounded-lg text-white"
        >
        Security headers are your first line of defense against XSS, clickjacking, MIME sniffing, and more. SecuriHeader helps you audit and fix them fast.
        </motion.div>

      </motion.div>
    </section>
  );
};

export default AboutSection;
