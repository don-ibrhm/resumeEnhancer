import { Hero } from "home/Hero";
import { Steps } from "home/Steps";
import { Features } from "home/Features";
import { Testimonials } from "home/Testimonials";
import { QuestionsAndAnswers } from "home/QuestionsAndAnswers";

export default function Home() {
  fetch("https://resenhapi.onrender.com/",
  {
      method: "GET",
      mode: "cors",
  })
  console.log("pinging...")
  return (
    <main className="mx-auto max-w-screen-2xl bg-dot px-8 pb-8 text-gray-900 lg:px-12">
      <Hero />
      <Steps />
      {/* <Features />
      <Testimonials />
      <QuestionsAndAnswers /> */}
    </main>
  );
}