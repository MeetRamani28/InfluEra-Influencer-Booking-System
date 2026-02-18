// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const ContactUs = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 pt-[12vh] pb-16">
      <section className="px-6 lg:px-20 mb-16">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Contact <span className="text-pink-500">InfluEra</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Have questions or want to collaborate? We’d love to hear from you.
            Reach out and our team will get back to you as soon as possible.
          </p>
        </motion.div>
      </section>

      <section className="px-6 lg:px-20">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Send Us a Message
            </h2>

            <form className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Message</label>
                <textarea
                  rows={4}
                  placeholder="Write your message..."
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                  style={{ resize: "none", overflow: "hidden" }}
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-pink-500 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-pink-600 transition"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center space-y-8"
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                📍 Our Office
              </h3>
              <p className="text-gray-600">
                123 Influencer Street, Digital City, India
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                📧 Email
              </h3>
              <p className="text-gray-600">support@influera.com</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                📞 Phone
              </h3>
              <p className="text-gray-600">+91 98765 43210</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                🕒 Working Hours
              </h3>
              <p className="text-gray-600">
                Monday – Friday: 9:00 AM – 6:00 PM
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
