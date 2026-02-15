import React from "react";
import { motion } from "framer-motion";
import { Shield, Mail, Clock, CheckCircle } from "lucide-react";

const Security = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500/10 rounded-2xl mb-6">
              <Shield className="w-8 h-8 text-cyan-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Security Disclosure Policy
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              At ochai.dev, I value the work of security researchers. If you believe you've found a security vulnerability, please report it to me privately.
            </p>
          </div>

          {/* Reporting Guidelines */}
          <div className="bg-slate-900/50 rounded-2xl p-8 border border-slate-800 mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Mail className="w-6 h-6 text-cyan-400" />
              Reporting Guidelines
            </h2>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-cyan-400 mt-1">•</span>
                <span className="text-slate-300">
                  Email your findings to{" "}
                  <a
                    href="mailto:Thebonsaiboi@thebonsaiboi.com"
                    className="text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    Thebonsaiboi@thebonsaiboi.com
                  </a>
                  .
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400 mt-1">•</span>
                <span className="text-slate-300">
                  Provide a detailed description of the vulnerability and steps to reproduce it.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400 mt-1">•</span>
                <span className="text-slate-300">
                  Please give me a reasonable amount of time to respond and fix the issue before making any information public.
                </span>
              </li>
            </ul>
          </div>

          {/* Safe Harbor */}
          <div className="bg-slate-900/50 rounded-2xl p-8 border border-slate-800">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-400" />
              Safe Harbor
            </h2>
            <p className="text-slate-300 mb-4">
              I will not pursue legal action against researchers who:
            </p>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-green-400 mt-1">•</span>
                <span className="text-slate-300">
                  Do not cause harm to the site or its users.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-400 mt-1">•</span>
                <span className="text-slate-300">
                  Do not access or modify data that does not belong to them.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-400 mt-1">•</span>
                <span className="text-slate-300">
                  Provide us with a reasonable opportunity to resolve the issue before public disclosure.
                </span>
              </li>
            </ul>
          </div>

          {/* Footer Note */}
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-400 flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" />
              Thank you for helping keep ochai.dev secure
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Security;
