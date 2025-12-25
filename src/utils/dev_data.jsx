"use client";

const devs = [
  {
    name: "Shree B",
    role: "Co-Head",
    description: "Led the frontend team for OJUS 2026",
    github: "https://github.com/ssb-shree",
    linkedin: "https://www.linkedin.com/in/shree-bavachikar-a16493375/",
    website: "#",
  },
  {
    name: "Mahipal",
    role: "Volunteer",
    description: "Helped with frontend development",
    github: "https://github.com/Mahi-singh-solanki",
    linkedin: "https://www.linkedin.com/in/mahipalsinghsolanki",
    website: null,
  },
  {
    name: "Aditya",
    role: "Co-Head",
    description: "Led backend development for OJUS",
    github: "https://github.com/adityas27",
    linkedin: "https://linkedin.com/in/adityas27",
    website: null,
  },
  {
    name: "Jamil",
    role: "Volunteer",
    description: "Helped with backend development",
    github: "https://github.com/Viverun",
    linkedin: "https://www.linkedin.com/in/jamil-khan-55a621346/",
    website: null,
  },
];

const getGithubUsername = (url) => url.split("github.com/")[1];

const DevCard = ({ dev }) => {
  const username = getGithubUsername(dev.github);
  return (
    <div className="flex items-center gap-3 p-2 bg-zinc-900 rounded-md border border-zinc-800 w-full max-w-sm">
      <div className="w-10 h-10 rounded-full overflow-hidden border border-zinc-700 flex-shrink-0">
        <img
          src={`https://github.com/${username}.png`}
          alt={dev.name}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col gap-0.5">
        <p className="text-zinc-100 font-medium text-sm">{dev.name} · {dev.role}</p>
        <div className="flex gap-2 text-xs text-zinc-400 flex-wrap">
          <a href={dev.github} target="_blank" className="hover:text-zinc-200 transition-colors">GitHub</a>
          <a href={dev.linkedin} target="_blank" className="hover:text-zinc-200 transition-colors">LinkedIn</a>
          {dev.website && (
            <a href={dev.website} target="_blank" className="hover:text-zinc-200 transition-colors">Website</a>
          )}
        </div>
      </div>
    </div>
  );
};

export default function MeetTheDevs() {
  const frontendTeam = devs.filter(d => d.description.toLowerCase().includes("frontend"));
  const backendTeam = devs.filter(d => d.description.toLowerCase().includes("backend"));

  return (
    <section className="w-full bg-zinc-950 text-zinc-100 py-12 px-4 flex flex-col items-center gap-10">
      <h1 className="text-2xl font-bold text-center">Meet the Devs</h1>

      {/* Frontend Team */}
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-lg font-semibold">Frontend Team</h2>
        <div className="flex flex-wrap gap-3 justify-center">
          {frontendTeam.map(dev => (
            <DevCard key={dev.github} dev={dev} />
          ))}
        </div>
      </div>

      {/* Backend Team */}
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-lg font-semibold">Backend Team</h2>
        <div className="flex flex-wrap gap-3 justify-center">
          {backendTeam.map(dev => (
            <DevCard key={dev.github} dev={dev} />
          ))}
        </div>
      </div>
    </section>
  );
}
