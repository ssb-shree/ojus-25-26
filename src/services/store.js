import { create } from "zustand";

const data = [
    {
      img: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b",
      name: "Event 1",
      descp:
        "A flagship technical event featuring hackathons, coding battles, paper presentations, and workshops led by industry professionals.",
    },
    {
      img: "https://images.unsplash.com/photo-1515168833906-d2a3b82b302a",
      name: "Event 2",
      descp:
        "A celebration of art, music, dance, and drama where students showcase creativity through performances, competitions, and themed nights.",
    },
    {
      img: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
      name: "Event 3",
      descp:
        "An inter-departmental sports event including track and field, team sports, and indoor games promoting teamwork and competitive spirit.",
    },
    {
      img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655",
      name: "Event 4",
      descp:
        "Hands-on workshops on emerging technologies such as AI, cybersecurity, and cloud computing conducted by experienced mentors.",
    },
    {
      img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
      name: "Event 5",
      descp:
        "Talks and panel discussions with startup founders and investors focusing on innovation, product building, and real-world problem solving.",
    },
    {
      img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
      name: "Event 6",
      descp:
        "An interactive session where alumni share career journeys, industry insights, and guidance for students stepping into professional life.",
    },
  ]

const defaultEventData = {
    name: "Hint: Hover on Below Events",
    descp:
      "A flagship technical event featuring hackathons, coding battles, paper presentations, and workshops led by industry professionals",
  }

export const useEventStore = create((set) => ({
  allEventData : data,
  eventData: defaultEventData,
  updateEventData: (data) => set(() => ({ eventData: data })),
  setDefaultEventData : ()=> set(()=>({eventData : defaultEventData})),
}));
