"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Phone, Mail, Clock, MapPin, Facebook, Send, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/sections"

export default function ContactPage() {
  const [formState, setFormState] = React.useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  })
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formState.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formState.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formState.phone.trim()) {
      newErrors.phone = "Phone is required"
    }

    if (!formState.message.trim()) {
      newErrors.message = "Message is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="py-16 section-white">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Contact Us
            </span>
            <h1 className="text-headline text-foreground mb-4">
              Get in Touch
            </h1>
            <p className="text-subtitle">
              Have questions? We&apos;re here to help. Reach out to our local
              Cavite-based support team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-12 section-light">
        <div className="container-wide">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-border">
                <h2 className="text-title mb-6">Send us a message</h2>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="text-center py-12 relative"
                  >
                    {/* Success confetti particles */}
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full"
                        style={{
                          left: "50%",
                          top: "30%",
                          backgroundColor: [
                            "#0EA5E9", "#22C55E", "#A855F7", "#F59E0B"
                          ][i % 4],
                        }}
                        initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                        animate={{
                          opacity: [0, 1, 1, 0],
                          scale: [0, 1, 1, 0.5],
                          x: Math.cos((i * 30) * Math.PI / 180) * (80 + (i % 3) * 30),
                          y: Math.sin((i * 30) * Math.PI / 180) * (60 + (i % 3) * 20) - 20,
                        }}
                        transition={{
                          duration: 0.8,
                          delay: 0.1 + i * 0.03,
                          ease: "easeOut",
                        }}
                      />
                    ))}

                    {/* Animated check circle */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: 0.1,
                      }}
                      className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30"
                    >
                      <motion.svg
                        className="w-10 h-10 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <motion.path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.4, delay: 0.3 }}
                        />
                      </motion.svg>
                    </motion.div>

                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-2xl font-bold text-foreground mb-2"
                    >
                      Message Sent!
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-muted-foreground mb-6"
                    >
                      Thank you for reaching out. We&apos;ll get back to you within
                      24 hours.
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsSubmitted(false)
                          setFormState({
                            name: "",
                            email: "",
                            phone: "",
                            company: "",
                            message: "",
                          })
                        }}
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Name <span className="text-red-500">*</span>
                        </label>
                        <motion.input
                          type="text"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          whileFocus={{ scale: 1.01, boxShadow: "0 0 0 3px rgba(14,165,233,0.15)" }}
                          className={`w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200 ${
                            errors.name ? "border-red-500" : "border-border"
                          }`}
                          placeholder="Your name"
                        />
                        {errors.name && (
                          <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-sm mt-1"
                          >
                            {errors.name}
                          </motion.p>
                        )}
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                      >
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <motion.input
                          type="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          whileFocus={{ scale: 1.01, boxShadow: "0 0 0 3px rgba(14,165,233,0.15)" }}
                          className={`w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200 ${
                            errors.email ? "border-red-500" : "border-border"
                          }`}
                          placeholder="your@email.com"
                        />
                        {errors.email && (
                          <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-sm mt-1"
                          >
                            {errors.email}
                          </motion.p>
                        )}
                      </motion.div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Phone <span className="text-red-500">*</span>
                        </label>
                        <motion.input
                          type="tel"
                          name="phone"
                          value={formState.phone}
                          onChange={handleChange}
                          whileFocus={{ scale: 1.01, boxShadow: "0 0 0 3px rgba(14,165,233,0.15)" }}
                          className={`w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200 ${
                            errors.phone ? "border-red-500" : "border-border"
                          }`}
                          placeholder="+63 917 123 4567"
                        />
                        {errors.phone && (
                          <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-sm mt-1"
                          >
                            {errors.phone}
                          </motion.p>
                        )}
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                      >
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Company <span className="text-muted-foreground">(optional)</span>
                        </label>
                        <motion.input
                          type="text"
                          name="company"
                          value={formState.company}
                          onChange={handleChange}
                          whileFocus={{ scale: 1.01, boxShadow: "0 0 0 3px rgba(14,165,233,0.15)" }}
                          className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
                          placeholder="Your company"
                        />
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <motion.textarea
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        rows={5}
                        whileFocus={{ scale: 1.005, boxShadow: "0 0 0 3px rgba(14,165,233,0.15)" }}
                        className={`w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200 resize-none ${
                          errors.message ? "border-red-500" : "border-border"
                        }`}
                        placeholder="How can we help you?"
                      />
                      {errors.message && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm mt-1"
                        >
                          {errors.message}
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                    >
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full relative overflow-hidden"
                        disabled={isSubmitting}
                      >
                        <motion.span
                          className="flex items-center justify-center"
                          animate={isSubmitting ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </motion.span>
                        {isSubmitting && (
                          <motion.span
                            className="absolute inset-0 flex items-center justify-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <motion.span
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            <span className="ml-2">Sending...</span>
                          </motion.span>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Contact Cards */}
              {[
                {
                  icon: Phone,
                  title: "Phone",
                  content: "(046) 123-4567",
                  subContent: "+63 917 123 4567",
                },
                {
                  icon: Mail,
                  title: "Email",
                  content: "support@imperial.ph",
                  subContent: "sales@imperial.ph",
                },
                {
                  icon: MapPin,
                  title: "Office",
                  content: "123 Main Street",
                  subContent: "Imus City, Cavite 4103",
                },
                {
                  icon: Clock,
                  title: "Business Hours",
                  content: "Monday - Saturday",
                  subContent: "8:00 AM - 6:00 PM",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4 p-5 bg-white rounded-xl border border-border"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">{item.content}</p>
                    <p className="text-muted-foreground text-sm">
                      {item.subContent}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Social Links */}
              <div className="p-5 bg-white rounded-xl border border-border">
                <h3 className="font-semibold text-foreground mb-3">Follow Us</h3>
                <div className="flex items-center gap-3">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}
