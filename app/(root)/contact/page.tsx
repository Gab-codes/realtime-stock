"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { APP_NAME } from "@/lib/utils";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { toast } from "sonner";
import InputField from "@/components/forms/InputField";
import TextareaField from "@/components/forms/TextareaField";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Message sent successfully! We'll get back to you soon.");
      reset();
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="mt-20 bg-background text-foreground">
      <div className="container py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Have questions about {APP_NAME}? Need support or want to learn more
            about our services? We're here to help. Reach out to our team and
            we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  name="firstName"
                  label="First Name"
                  placeholder="John"
                  register={register}
                  error={errors.firstName}
                  validation={{ required: "First name is required" }}
                />
                <InputField
                  name="lastName"
                  label="Last Name"
                  placeholder="Doe"
                  register={register}
                  error={errors.lastName}
                  validation={{ required: "Last name is required" }}
                />
              </div>

              <InputField
                name="email"
                label="Email Address"
                placeholder="john@example.com"
                type="email"
                register={register}
                error={errors.email}
                validation={{
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                }}
              />

              <InputField
                name="subject"
                label="Subject"
                placeholder="Enter subject"
                register={register}
                validation={{ required: "Subject is required" }}
                error={errors.subject}
              />

              <TextareaField
                name="message"
                label="Message"
                placeholder="Tell us how we can help you..."
                control={control}
                error={errors.message}
                required
                rows={6}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-crypto-purple hover:bg-crypto-dark-purple disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-6">
                Contact Information
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-crypto-purple/10 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-crypto-purple" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email Support</h3>
                    <p className="text-foreground/70 mb-1">
                      support@{APP_NAME.toLowerCase().replace(/\s+/g, "")}.com
                    </p>
                    <p className="text-sm text-foreground/60">
                      We typically respond within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-crypto-purple/10 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-crypto-purple" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone Support</h3>
                    <p className="text-foreground/70 mb-1">+1 (555) 123-4567</p>
                    <p className="text-sm text-foreground/60">
                      Mon-Fri, 9 AM - 6 PM EST
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-crypto-purple/10 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-crypto-purple" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Office Address</h3>
                    <p className="text-foreground/70">
                      123 Financial District
                      <br />
                      New York, NY 10001
                      <br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-crypto-purple/10 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-crypto-purple" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Business Hours</h3>
                    <div className="text-foreground/70 space-y-1">
                      <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                      <p>Saturday: 10:00 AM - 4:00 PM EST</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Support Options */}
        <div className="bg-gradient-to-r from-crypto-purple/5 to-crypto-light-purple/5 border border-crypto-purple/20 rounded-lg p-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">
              Need Immediate Help?
            </h2>
            <p className="text-foreground/80 mb-6 max-w-2xl mx-auto">
              Need quick support? Start a chat with our support team for
              immediate assistance. We’re here to help resolve any issues or
              questions you may have.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
