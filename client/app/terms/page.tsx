import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="bg-muted/50 py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Terms of Service
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Last updated: April 16, 2023
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-12">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground">
                  By accessing or using the Team-up platform, you agree to be
                  bound by these Terms of Service and all applicable laws and
                  regulations. If you do not agree with any of these terms, you
                  are prohibited from using or accessing this site.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">2. Use License</h2>
                <p className="text-muted-foreground">
                  Permission is granted to temporarily use the Team-up platform
                  for personal, non-commercial transitory viewing only. This is
                  the grant of a license, not a transfer of title, and under
                  this license you may not:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Modify or copy the materials</li>
                  <li>
                    Use the materials for any commercial purpose or for any
                    public display
                  </li>
                  <li>
                    Attempt to reverse engineer any software contained on the
                    Team-up platform
                  </li>
                  <li>
                    Remove any copyright or other proprietary notations from the
                    materials
                  </li>
                  <li>
                    Transfer the materials to another person or "mirror" the
                    materials on any other server
                  </li>
                </ul>
                <p className="text-muted-foreground">
                  This license shall automatically terminate if you violate any
                  of these restrictions and may be terminated by Team-up at any
                  time.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">3. User Accounts</h2>
                <p className="text-muted-foreground">
                  To use certain features of the platform, you must register for
                  an account. You agree to provide accurate, current, and
                  complete information during the registration process and to
                  update such information to keep it accurate, current, and
                  complete. You are responsible for safeguarding your password
                  and for all activities that occur under your account.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">4. User Content</h2>
                <p className="text-muted-foreground">
                  Our platform allows you to post, link, store, share and
                  otherwise make available certain information, text, graphics,
                  videos, or other material. You are responsible for the content
                  you post and its legality, reliability, and appropriateness.
                </p>
                <p className="text-muted-foreground">
                  By posting content on our platform, you grant us the right to
                  use, modify, publicly perform, publicly display, reproduce,
                  and distribute such content on and through the platform. You
                  retain any and all of your rights to any content you submit,
                  post, or display on or through the platform and you are
                  responsible for protecting those rights.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">5. Prohibited Activities</h2>
                <p className="text-muted-foreground">
                  You may not access or use the platform for any purpose other
                  than that for which we make it available. The platform may not
                  be used in connection with any commercial endeavors except
                  those that are specifically endorsed or approved by us.
                </p>
                <p className="text-muted-foreground">
                  Prohibited activities include, but are not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>
                    Systematic retrieval of data or other content from the
                    platform
                  </li>
                  <li>
                    Creating or compiling, directly or indirectly, a collection,
                    compilation, database, or directory without written
                    permission from us
                  </li>
                  <li>
                    Making any unauthorized use of the platform, including
                    collecting usernames and/or email addresses of users by
                    electronic or other means
                  </li>
                  <li>
                    Engaging in unauthorized framing of or linking to the
                    platform
                  </li>
                  <li>
                    Tricking, defrauding, or misleading us and other users,
                    especially in any attempt to learn sensitive account
                    information
                  </li>
                  <li>
                    Engaging in any automated use of the system, such as using
                    scripts to send messages or upload content
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">6. Intellectual Property</h2>
                <p className="text-muted-foreground">
                  The platform and its original content (excluding content
                  provided by users), features, and functionality are and will
                  remain the exclusive property of Team-up and its licensors.
                  The platform is protected by copyright, trademark, and other
                  laws of both the United States and foreign countries. Our
                  trademarks and trade dress may not be used in connection with
                  any product or service without the prior written consent of
                  Team-up.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">7. Termination</h2>
                <p className="text-muted-foreground">
                  We may terminate or suspend your account and bar access to the
                  platform immediately, without prior notice or liability, under
                  our sole discretion, for any reason whatsoever and without
                  limitation, including but not limited to a breach of the
                  Terms.
                </p>
                <p className="text-muted-foreground">
                  If you wish to terminate your account, you may simply
                  discontinue using the platform, or notify us that you wish to
                  delete your account.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">
                  8. Limitation of Liability
                </h2>
                <p className="text-muted-foreground">
                  In no event shall Team-up, nor its directors, employees,
                  partners, agents, suppliers, or affiliates, be liable for any
                  indirect, incidental, special, consequential or punitive
                  damages, including without limitation, loss of profits, data,
                  use, goodwill, or other intangible losses, resulting from your
                  access to or use of or inability to access or use the
                  platform.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">9. Changes to Terms</h2>
                <p className="text-muted-foreground">
                  We reserve the right, at our sole discretion, to modify or
                  replace these Terms at any time. If a revision is material we
                  will provide at least 30 days' notice prior to any new terms
                  taking effect. What constitutes a material change will be
                  determined at our sole discretion.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">10. Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have any questions about these Terms, please contact us
                  at:
                </p>
                <div className="text-muted-foreground">
                  <p>Team-up</p>
                  <p>123 Innovation Street</p>
                  <p>Tech City, TC 12345</p>
                  <p>Email: legal@Team-up.example.com</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
