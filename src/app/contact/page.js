export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-display text-white mb-6">Contact Us</h1>
        <p className="text-muted text-xl">
          Ready to start? Send us a message and we will get back to you within 24 hours.
        </p>
      </div>

      <div className="bg-surface p-8 md:p-12 rounded-3xl border border-gray-800">
        <form action="https://formsubmit.co/your-email@gmail.com" method="POST" className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Your Name</label>
              <input type="text" name="name" required className="w-full bg-background border border-gray-700 rounded-lg p-3 text-white focus:border-primary focus:outline-none" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
              <input type="email" name="email" required className="w-full bg-background border border-gray-700 rounded-lg p-3 text-white focus:border-primary focus:outline-none" placeholder="john@example.com" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Subject</label>
            <select name="subject" className="w-full bg-background border border-gray-700 rounded-lg p-3 text-white focus:border-primary focus:outline-none">
              <option>I need a Website</option>
              <option>I need Custom Software</option>
              <option>I need Branding/Design</option>
              <option>Other Inquiry</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
            <textarea name="message" rows="5" required className="w-full bg-background border border-gray-700 rounded-lg p-3 text-white focus:border-primary focus:outline-none" placeholder="Tell us about your project..."></textarea>
          </div>

          <button type="submit" className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-4 rounded-lg transition-all shadow-lg shadow-blue-500/20">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}