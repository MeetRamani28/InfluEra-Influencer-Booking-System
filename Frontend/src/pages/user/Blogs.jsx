// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import one from "../../assets/images/one.jpg";
import two from "../../assets/images/two.jpg";
import three from "../../assets/images/three.jpg";
import four from "../../assets/images/four.jpg";
import fifth from "../../assets/images/fifth.jpg";
import six from "../../assets/images/six.jpg";
import seven from "../../assets/images/seven.jpg";
import eight from "../../assets/images/eight.jpg";
import nine from "../../assets/images/nine.jpg";

const blogs = [
  {
    title: "Emma Johnson - The Fitness Queen",
    description:
      "Emma shares powerful workout routines, healthy lifestyle tips, and motivational content to inspire millions worldwide.",
    image: one,
  },
  {
    title: "Alex Carter - Fashion Trendsetter",
    description:
      "Alex collaborates with top brands and showcases bold fashion statements that redefine modern style.",
    image: two,
  },
  {
    title: "Sarah Thompson - Tech Influencer",
    description:
      "Sarah simplifies AI, gadgets, and cybersecurity topics for her growing online tech community.",
    image: three,
  },
  {
    title: "Liam Brown - Travel Explorer",
    description:
      "Liam captures breathtaking destinations and shares travel hacks for budget-friendly adventures.",
    image: four,
  },
  {
    title: "Olivia Smith - Food Creator",
    description:
      "Olivia brings delicious recipes, restaurant reviews, and global street food experiences.",
    image: fifth,
  },
  {
    title: "Daniel Lee - Gaming Pro",
    description:
      "Daniel is an esports player and Twitch streamer entertaining thousands daily.",
    image: six,
  },
  {
    title: "Sophia Williams - Beauty Expert",
    description:
      "Sophia shares skincare routines, makeup tutorials, and honest product reviews.",
    image: seven,
  },
  {
    title: "Noah Martinez - Finance Mentor",
    description:
      "Noah teaches investing strategies and financial freedom for young professionals.",
    image: eight,
  },
  {
    title: "Isabella Davis - Lifestyle Creator",
    description:
      "Isabella inspires with productivity hacks, wellness tips, and daily motivation.",
    image: nine,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const Blogs = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.8, 1, 0.9]);

  return (
    <motion.section
      ref={ref}
      style={{ y, opacity }}
      className="w-full min-h-screen pb-16 bg-gray-50"
    >
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-14 px-4"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
          Influ<span className="text-pink-500">Era</span> Blogs
        </h1>

        <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-base">
          Discover inspiring stories from top influencers across fitness,
          fashion, tech, travel, gaming, and lifestyle.
        </p>
      </motion.div>

      <div className="px-4 sm:px-6 lg:px-12">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          {blogs.map((blog, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -12 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group flex flex-col"
            >
              <div className="overflow-hidden">
                <motion.img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-56 object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              <div className="p-6 flex flex-col grow">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {blog.title}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed line-clamp-4 grow">
                  {blog.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Blogs;
