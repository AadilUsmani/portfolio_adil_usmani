"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Mail, Key, CheckCircle } from "lucide-react"

export default function ContactFormInstructions() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="bg-blue-900/20 border-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Mail className="w-5 h-5" />
            Contact Form Setup Required
          </CardTitle>
        </CardHeader>
        <CardContent className="text-white space-y-4">
          <p>Your contact form is ready but needs a free email service to actually send emails.</p>

          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Key className="w-4 h-4" />
              Quick Setup (2 minutes):
            </h3>

            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>
                Go to <strong>web3forms.com</strong>
              </li>
              <li>
                Click <strong>"Create Access Key"</strong>
              </li>
              <li>
                Enter your email: <strong>muhammadaadilusmani@gmail.com</strong>
              </li>
              <li>Copy the access key you receive</li>
              <li>Replace the demo key in your code</li>
            </ol>
          </div>

          <div className="flex gap-3">
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <a
                href="https://web3forms.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Get Free Access Key
              </a>
            </Button>
          </div>

          <div className="bg-green-900/30 border border-green-500 rounded p-3">
            <p className="flex items-center gap-2 text-green-400">
              <CheckCircle className="w-4 h-4" />
              <strong>100% Free</strong> - No monthly limits, no credit card required
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
