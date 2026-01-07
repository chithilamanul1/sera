import FadeIn from "@/components/FadeIn";

export default function Contact() {
  return (
    <div className="min-h-screen pt-32 px-6 pb-20">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">Start Your Project</h1>
            <p className="text-muted text-xl">
              Ready to engineer your future? Send us a signal.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="bg-surface p-8 md:p-12 rounded-3xl border border-gray-800 shadow-2xl">
            {/* FORM ACTION UPDATED TO seranexdigital@gmail.com */}
            <form action="https://formsubmit.co/seranexdigital@gmail.com" method="POST" className="space-y-6">
              
              {/* Form Config */}
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value="https://seranex.org/contact?success=true" />
              <input type="hidden" name="_subject" value="New Lead from Seranex Website!" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Your Name</label>
                  <input type="text" name="name" required className="w-full bg-black border border-gray-700 rounded-lg p-4 text-white focus:border-primary outline-none transition-colors" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Email Address</label>
                  <input type="email" name="email" required className="w-full bg-black border border-gray-700 rounded-lg p-4 text-white focus:border-primary outline-none transition-colors" placeholder="john@example.com" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Service Required</label>
                <select name="subject" className="w-full bg-black border border-gray-700 rounded-lg p-4 text-white focus:border-primary outline-none transition-colors">
                  <option>I need a Website (LKR 15k+)</option>
                  <option>I need Custom Software (POS/ERP)</option>
                  <option>I need Branding/Design</option>
                  <option>Other Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Message</label>
                <textarea name="message" rows="5" required className="w-full bg-black border border-gray-700 rounded-lg p-4 text-white focus:border-primary outline-none transition-colors" placeholder="Tell us about your project..."></textarea>
              </div>

              <button type="submit" className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-4 rounded-lg transition-all shadow-lg shadow-blue-500/20 text-lg uppercase tracking-widest">
                Send Message
              </button>
            </form>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}