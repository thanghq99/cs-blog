import DashboardLayout from "@/src/components/layout/DasboardLayout";
import PageHeader from "@/src/components/sharedComponents/PageHeader";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const roundStartQuotes = ["Let's make this right as rain.",
"Let's go, fellas.",
"Let's move out!",
"Let's move out.",
"Remove any doubts in your head; it's us, or them.",
"Remember! This isn't the killing house anymore! This is real life.",
"Watch out. These boys have got a bit of an arsenal and they don't mind using it!",
"Let's have it, lads!",
"Let's give it to them, boys!",
"Let's show them who we are!",
"Are we rushing in? Or are we going sneaky-beaky like?",
"For Queen and country, men!",
"Remember! This is bandit country. Shoot everything that moves.",
"Gear up! We're going in!",
"We are out of here!",
"We're on!",
"Right lads, we're on.",
"These fellas are gonna regret waking up this morning.",
"They're gonna wish they were never born.",
"Let's have at it, mates!",
"Gear up; We aren't going on a windy walk here!"]

const tideItems = [
  {url: '/dashboard/users', name: 'Users'},
  {url: '/dashboard/news', name: 'News'},
  {url: '/dashboard/updates', name: 'Updates'},
]

const Tile = ({item}) => {
return <Link href={item.url} legacyBehavior>
  <a className={`w-full my-2 py-10 text-center text-3xl uppercase font-semibold shadow-md shadow-red-600 tracking-wider transition bg-red-500 text-black lg:hover:text-4xl lg:hover:tracking-widest lg:hover:shadow-xl lg:hover:shadow-red-700 `}>{item.name}</a>
</Link>}

function Dashboard() {
  const [quote, setQuote] = useState('')

  useEffect(() => {
    const getRandomQuote = () => {
    const index = Math.floor(roundStartQuotes.length * Math.random())
    setQuote(roundStartQuotes[index])
  }
getRandomQuote()
  })
  return <div className="p-4">
    <PageHeader title={`"${quote}"`}/>
    <div className="flex flex-col lg:flex-row lg:space-x-3 lg:items-start">
      {tideItems.map((item, index) => <Tile key={index} item={item}></Tile>)}
    </div>
  </div>;
}

export default Dashboard;

Dashboard.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
