"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Phone,
  MapPin,
  LucideTwitter,
  LucideGithub,
  LucideLinkedin,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { FormEvent, useState } from "react";
import axios from "axios";

const server_api = process.env.NEXT_PUBLIC_SERVER_API;

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [subscribe, setSubscribe] = useState({
    firstname: "",
    lastname: "",
    email: "",
    subject: "",
    message: "",
  });

  const createSubscription = async (e: FormEvent) => {
    e.preventDefault();
    console.log(server_api);
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(`${server_api}/subscribe`, {
        firstname: subscribe.firstname,
        lastname: subscribe.lastname,
        email: subscribe.email,
        subject: subscribe.subject,
        message: subscribe.message,
      });

      console.log(response);

      if (response.status === 200) {
        setSubscribe({
          email: "",
          firstname: "",
          lastname: "",
          message: "",
          subject: "",
        });
      } else {
        console.log("error while inserting new data");
      }
    } catch (error) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // input handler
  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSubscribe((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="bg-muted/50 py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Contact Us
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Have questions or feedback? We'd love to hear from you.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 md:grid-cols-2">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold tracking-tighter mb-4">
                    Get in Touch
                  </h2>
                  <p className="text-muted-foreground">
                    We're here to help with any questions about our platform,
                    features, or how to get started.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Mail className="h-5 w-5 mt-0.5 text-primary" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-sm text-muted-foreground">
                        support@Team-up.example.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="h-5 w-5 mt-0.5 text-primary" />
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-sm text-muted-foreground">
                        +1 (555) 123-4567
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 mt-0.5 text-primary" />
                    <div>
                      <h3 className="font-medium">Office</h3>
                      <p className="text-sm text-muted-foreground">
                        123 Innovation Street
                        <br />
                        Tech City, TC 12345
                        <br />
                        United States
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Follow Us</h3>
                  <div className="flex gap-4">
                    <Link
                      href="https://x.com/adil_kadival"
                      className="rounded-full bg-muted p-2 text-muted-foreground hover:text-foreground"
                    >
                      <span className="sr-only">Twitter</span>
                      <LucideTwitter />
                    </Link>
                    <Link
                      href="https://github.com/adilkadivala"
                      className="rounded-full bg-muted p-2 text-muted-foreground hover:text-foreground"
                    >
                      <span className="sr-only">GitHub</span>
                      <LucideGithub />
                    </Link>
                    <Link
                      href="https://www.linkedin.com/in/adilkadival/"
                      className="rounded-full bg-muted p-2 text-muted-foreground hover:text-foreground"
                    >
                      <span className="sr-only">LinkedIn</span>
                      <LucideLinkedin />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-background p-8 shadow-sm">
                <h3 className="text-xl font-bold mb-6">Send us a Message</h3>
                <form
                  className="space-y-6"
                  method="post"
                  onSubmit={createSubscription}
                  encType="multipart/form-data"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label
                        htmlFor="firstname"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        First name
                      </label>
                      <Input
                        id="firstname"
                        placeholder="Enter your first name"
                        name="firstname"
                        value={subscribe.firstname}
                        onChange={handleInput}
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="lastname"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Last name
                      </label>
                      <Input
                        id="lastname"
                        name="lastname"
                        placeholder="Enter your last name"
                        value={subscribe.lastname}
                        onChange={handleInput}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={subscribe.email}
                      name="email"
                      placeholder="Enter your email"
                      onChange={handleInput}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="subject"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Subject
                    </label>
                    <Input
                      id="subject"
                      placeholder="Enter the subject"
                      name="subject"
                      onChange={handleInput}
                      value={subscribe.subject}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Enter your message"
                      className="min-h-[120px]"
                      name="message"
                      value={subscribe.message}
                      onChange={handleInput}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full cursor-pointer"
                    disabled={isLoading}
                  >
                    {isLoading ? "sending" : "Send Message"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-muted/50 py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter">
                  Frequently Asked Questions
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground">
                  Find answers to common questions about Team-up.
                </p>
              </div>
            </div>

            <div className="mx-auto mt-12 max-w-3xl space-y-6">
              {[
                {
                  q: "How do I find teammates for a specific hackathon?",
                  a: "You can use our search filters to find users who have expressed interest in the same hackathon. Simply navigate to the 'Browse' page and use the hackathon filter.",
                },
                {
                  q: "Is Team-up free to use?",
                  a: "Yes, Team-up is completely free for basic use. We offer premium features for power users who need advanced matching and team management tools.",
                },
                {
                  q: "How can I list my skills on my profile?",
                  a: "After signing up, you can edit your profile to add your skills, experience level, and the technologies you're familiar with. This helps others find you based on your expertise.",
                },
                {
                  q: "Can I use Team-up for virtual/online hackathons?",
                  a: "Team-up is designed for both in-person and virtual hackathons. You can specify your preference for remote collaboration in your profile.",
                },
              ].map((faq, i) => (
                <div key={i} className="rounded-lg border bg-background p-6">
                  <h3 className="text-lg font-bold mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
