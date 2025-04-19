import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="bg-muted/50 py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Privacy Policy
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
                <h2 className="text-2xl font-bold">Introduction</h2>
                <p className="text-muted-foreground">
                  At Team-up, we take your privacy seriously. This Privacy
                  Policy explains how we collect, use, disclose, and safeguard
                  your information when you visit our website and use our
                  services. Please read this privacy policy carefully. If you do
                  not agree with the terms of this privacy policy, please do not
                  access the site.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Information We Collect</h2>
                <p className="text-muted-foreground">
                  We collect information that you provide directly to us when
                  you register on our site, create or modify your profile, or
                  communicate with us. This information may include:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>
                    Personal information such as your name, email address, and
                    profile picture
                  </li>
                  <li>
                    Professional information such as your skills, experience,
                    and portfolio
                  </li>
                  <li>
                    Preferences such as hackathon interests and location
                    preferences
                  </li>
                  <li>
                    Communications and correspondence you have with other users
                    on our platform
                  </li>
                  <li>Any other information you choose to provide</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">
                  How We Use Your Information
                </h2>
                <p className="text-muted-foreground">
                  We use the information we collect to provide, maintain, and
                  improve our services, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>
                    Facilitating matches between users based on skills,
                    interests, and preferences
                  </li>
                  <li>Enabling communication between potential teammates</li>
                  <li>
                    Personalizing your experience and delivering content
                    relevant to your interests
                  </li>
                  <li>
                    Sending you technical notices, updates, security alerts, and
                    support messages
                  </li>
                  <li>Responding to your comments, questions, and requests</li>
                  <li>
                    Monitoring and analyzing trends, usage, and activities in
                    connection with our services
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Sharing Your Information</h2>
                <p className="text-muted-foreground">
                  We may share information about you in the following
                  circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>
                    With other users as part of your public profile and
                    team-matching functionality
                  </li>
                  <li>
                    With vendors, consultants, and other service providers who
                    need access to such information to carry out work on our
                    behalf
                  </li>
                  <li>
                    In response to a request for information if we believe
                    disclosure is in accordance with any applicable law,
                    regulation, or legal process
                  </li>
                  <li>
                    If we believe your actions are inconsistent with our user
                    agreements or policies, or to protect the rights, property,
                    and safety of Team-up or others
                  </li>
                  <li>
                    In connection with, or during negotiations of, any merger,
                    sale of company assets, financing, or acquisition of all or
                    a portion of our business by another company
                  </li>
                  <li>With your consent or at your direction</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Data Security</h2>
                <p className="text-muted-foreground">
                  We take reasonable measures to help protect information about
                  you from loss, theft, misuse, unauthorized access, disclosure,
                  alteration, and destruction. However, no internet or
                  electronic communications service is ever completely secure or
                  error-free.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Your Choices</h2>
                <p className="text-muted-foreground">
                  You may update, correct, or delete information about you at
                  any time by logging into your online account and modifying
                  your profile. If you wish to delete your account, please
                  contact us, but note that we may retain certain information as
                  required by law or for legitimate business purposes.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">
                  Changes to this Privacy Policy
                </h2>
                <p className="text-muted-foreground">
                  We may change this privacy policy from time to time. If we
                  make changes, we will notify you by revising the date at the
                  top of the policy and, in some cases, we may provide you with
                  additional notice. We encourage you to review the privacy
                  policy whenever you access our services to stay informed about
                  our information practices.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have any questions about this privacy policy or our
                  practices, please contact us at:
                </p>
                <div className="text-muted-foreground">
                  <p>Team-up</p>
                  <p>123 Innovation Street</p>
                  <p>Tech City, TC 12345</p>
                  <p>Email: privacy@Team-up.example.com</p>
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
