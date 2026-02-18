// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 pt-[12vh] pb-16">
      <section className="px-6 lg:px-20 mb-20">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-pink-500">InfluEra</span>
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            InfluEra is a powerful platform connecting brands with top
            influencers across fitness, fashion, tech, travel, gaming, and
            lifestyle. We help creators grow and brands reach the right
            audience.
          </p>
        </motion.div>
      </section>

      <section className="px-6 lg:px-20 mb-20">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              To empower influencers and businesses by creating meaningful
              collaborations that drive impact, creativity, and measurable
              growth.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Our Vision
            </h2>
            <p className="text-gray-600 leading-relaxed">
              To become the leading global influencer marketing platform that
              bridges creativity with business success.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-6 lg:px-20 mb-20">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12 text-gray-900"
        >
          Why Choose InfluEra?
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            "Verified Influencers",
            "Secure Collaboration",
            "Data Driven Campaigns",
            "Fast & Easy Booking",
            "Transparent Pricing",
            "24/7 Support",
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition"
            >
              <h3 className="font-semibold text-lg text-gray-800">{item}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-6 lg:px-20">
        <div className="bg-pink-500 rounded-3xl p-10 text-white">
          <div className="grid sm:grid-cols-3 gap-10 text-center">
            {[
              { number: "500+", label: "Active Influencers" },
              { number: "300+", label: "Brands Connected" },
              { number: "1200+", label: "Successful Campaigns" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl font-bold">{stat.number}</h3>
                <p className="mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
