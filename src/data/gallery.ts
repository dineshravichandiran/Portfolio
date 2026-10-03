export interface GalleryItem {
  src: string
  title: string
  detail: string
  date?: string
  alt: string
  // Overrides the grid's default: certificates sit whole on a white mat, photos fill the frame.
  fit?: 'contain' | 'cover'
}

export interface GalleryGroup {
  heading: string
  items: GalleryItem[]
}

// Captions repeat only what each certificate or photo actually shows.
export const certificateGroups: GalleryGroup[] = [
  {
    heading: 'Competitions',
    items: [
      {
        src: '/gallery/sih-2020-winner.jpg',
        title: 'Smart India Hackathon 2020: Winner',
        detail: 'Software Edition, Grand Finale · team MedBot Creators',
        date: '1–3 Aug 2020',
        alt: 'Smart India Hackathon 2020 winner certificate awarded to Dinesh R of team MedBot Creators',
      },
      {
        src: '/gallery/sih-2020-internal-hackathon.jpg',
        title: 'Internal Hackathon for Smart India Hackathon 2020',
        detail: 'Participation · Panimalar Engineering College · team Med Bot Creators',
        date: '2020',
        alt: 'Participation certificate from the Panimalar Engineering College internal hackathon for Smart India Hackathon 2020',
      },
    ],
  },
  {
    heading: 'Conference',
    items: [
      {
        src: '/gallery/techx-conf-2024-certificate.jpg',
        title: "TechX Conf 2024: Asia's Largest AI & Cloud Conference",
        detail: 'Certificate of Appreciation · Chennai',
        date: '15–16 Nov 2024',
        alt: 'TechX Conf 2024 certificate of appreciation awarded to Dinesh Ravichandiran',
      },
    ],
  },
  {
    heading: 'Courses & workshops',
    items: [
      {
        src: '/gallery/sathyabama-iot-short-course.jpg',
        title: 'ESP8266 and Raspberry Pi based Internet of Things',
        detail: 'Online short-term course · Sathyabama Institute of Science and Technology',
        date: '28–31 May 2020',
        alt: 'Sathyabama Institute certificate of participation for an online IoT short-term course',
      },
      {
        src: '/gallery/internshala-web-development-selection.jpg',
        title: 'Web Development internship selection',
        detail: 'Certificate of Selection · SVADHYAYA, via Internshala',
        date: '8 Oct 2020',
        alt: 'Internshala certificate of selection for a Web Development internship at SVADHYAYA',
      },
      {
        src: '/gallery/edify-iot-workshop.jpg',
        title: 'Internet of Things (IoT) workshop',
        detail: 'One-day workshop · Edify Techno Solutions',
        date: '15 Dec 2019',
        alt: 'Edify Techno Solutions certificate of appreciation for a one-day Internet of Things workshop',
      },
      {
        src: '/gallery/jarvis-robotics-workshop.jpg',
        title: 'Robotics workshop',
        detail: 'JARVIS national technical symposium · Chennai Institute of Technology',
        date: '4 Sep 2019',
        alt: 'Chennai Institute of Technology JARVIS certificate of completion for a robotics workshop',
      },
      {
        src: '/gallery/jarvis-industrial-automation-plc.jpg',
        title: 'Industrial Automation & PLC workshop',
        detail: 'JARVIS national technical symposium · Chennai Institute of Technology',
        date: '4 Sep 2019',
        alt: 'Chennai Institute of Technology JARVIS certificate of completion for an industrial automation and PLC workshop',
      },
      {
        src: '/gallery/jarvis-aero-modelling.jpg',
        title: 'Aero Modelling workshop',
        detail: 'JARVIS national technical symposium · Chennai Institute of Technology',
        date: '4 Sep 2019',
        alt: 'Chennai Institute of Technology JARVIS certificate of completion for an aero modelling workshop',
      },
      {
        src: '/gallery/smartphone-troubleshooting.jpg',
        title: 'Smartphone Troubleshooting',
        detail: 'Hands-on training · New Technology Mobile Service and Training Institute',
        date: '25–26 Nov 2019',
        alt: 'Panimalar Engineering College certificate for a hands-on smartphone troubleshooting training programme',
      },
      {
        src: '/gallery/pcb-design-workshop.jpg',
        title: 'PCB Design workshop',
        detail: 'Four-day workshop · Crystal Clear Technology and Innovation',
        date: '10–13 Dec 2019',
        alt: 'Crystal Clear Technology and Innovation certificate for a four-day PCB design workshop',
      },
      {
        src: '/gallery/nstedb-entrepreneur-awareness-camp.jpg',
        title: 'Entrepreneur Awareness Camp',
        detail: 'Certificate of Appreciation · NSTEDB, DST · Panimalar Engineering College',
        date: '2–4 Nov 2019',
        alt: 'Entrepreneur Awareness Camp certificate of appreciation sponsored by NSTEDB and the Department of Science and Technology',
      },
    ],
  },
  {
    heading: 'Programs & language',
    items: [
      {
        src: '/gallery/internshala-isp22-letter.jpg',
        title: 'Internshala Student Partner (ISP 22)',
        detail: 'Campus Ambassador Program · letter of recognition from Internshala',
        date: 'Apr–Jun 2021',
        alt: 'Internshala letter recognising Dinesh Ravichandiran for the Campus Ambassador Program, Internshala Student Partner 22 edition',
      },
      {
        src: '/gallery/ef-set-english-b2.jpg',
        title: 'EF SET English Certificate: B2 Upper Intermediate',
        detail: 'Score 56/100 · Reading 59, Listening 52 · verify at cert.efset.org/C4R6VE',
        date: '21 Jun 2022',
        alt: 'EF SET English Certificate showing a score of 56 out of 100, CEFR level B2 Upper Intermediate',
      },
    ],
  },
]

export const eventPhotos: GalleryItem[] = [
  {
    src: '/gallery/chennai-devops-meetup.jpg',
    title: 'Chennai DevOps Meetup',
    detail: 'IBM Software Labs, Chennai',
    alt: 'Collage of photos from the Chennai DevOps Meetup at IBM Software Labs: attendees, group sessions and a thank-you sign',
  },
  {
    src: '/gallery/techx-conf-2024-photo.jpg',
    title: "TechX Conf 2024",
    detail: "Asia's Largest AI & Cloud Conference · Chennai Trade Centre",
    date: '15–16 Nov 2024',
    alt: 'Dinesh standing in front of the TechX Conf 2024 AI and Cloud Conference backdrop',
  },
  {
    src: '/gallery/kcd-chennai-2025.jpg',
    title: 'KCD Chennai 2025',
    detail: 'IITM Research Park',
    date: '26 Apr 2025',
    alt: 'Dinesh standing in front of the KCD Chennai 2025 backdrop at IITM Research Park',
  },
  {
    src: '/gallery/aws-student-community-day-2026.jpg',
    title: 'AWS Student Community Day Chennai',
    detail: 'Sathyabama Institute of Science and Technology',
    date: '23 Jan 2026',
    alt: 'Dinesh standing in front of the AWS Student Community Day Chennai backdrop',
  },
]

export const runningItems: GalleryItem[] = [
  {
    src: '/gallery/fit4life-10k-2023.jpg',
    title: 'Fit4life Corporate Challenge: 10 km',
    detail: '2022-23 edition · Pune · 1:25:47',
    date: '5 Feb 2023',
    alt: 'Fit4life Corporate Challenge certificate of achievement for a 10 km run in Pune',
  },
  {
    src: '/gallery/tata-ultra-marathon-2023.jpg',
    title: 'Tata Ultra Marathon: 35 km',
    detail: 'Lonavala, Pune district · 6:21:07',
    date: '26 Feb 2023',
    alt: 'Tata Ultra Marathon certificate for completing 35 kilometres at Lonavala',
  },
  {
    src: '/gallery/magnathon-2025.jpg',
    title: 'Magnathon 2025',
    detail: 'Run for a cause · RCC Magnum Foundation',
    date: '2025',
    alt: 'Dinesh at the Magnathon 2025 run wearing the race shirt and finisher medal',
    fit: 'cover',
  },
]

export const artItems: GalleryItem[] = [
  {
    src: '/gallery/yuvasri-kala-bharathi-award.jpg',
    title: 'Yuvasri Kala Bharathi Award',
    detail: 'Excellence in education and drawing · 3rd prize, Tamil Nadu state-level drawing competition · Bharathi Yuva Kendra',
    date: '1 Dec 2013',
    alt: 'Yuvasri Kala Bharathi award certificate from Bharathi Yuva Kendra, written in Tamil, for excellence in education and drawing',
  },
]
