const User = require('../models/User');
const Job = require('../models/Job');
const Company = require('../models/Company');
const Notification = require('../models/Notification');

const initialJobs = [
  {
    id: 1,
    title: "Python Developer",
    company: "TechNova",
    companyLogo: "TN",
    location: "Chandigarh",
    salary: "₹5–8 LPA",
    jobType: "Full Time",
    experience: "1-3 Years",
    category: "Software Development",
    skills: ["Python", "Django", "SQL"],
    description: "Looking for an enthusiastic Python developer to join our backend team to build scalable microservices.",
    responsibilities: [
      "Develop backend applications",
      "Build REST APIs",
      "Work with databases",
      "Collaborate with frontend developers"
    ],
    requirements: [
      "Strong Python knowledge",
      "Understanding of SQL",
      "Knowledge of REST APIs",
      "Experience with Git"
    ],
    preferredSkills: ["Django", "FastAPI", "Docker", "AWS"],
    benefits: [
      "Flexible working",
      "Learning opportunities",
      "Health benefits",
      "Work from home options"
    ],
    postedDate: "2 days ago",
    applicants: 42,
    featured: true,
    remote: false,
    rating: 4.5,
    status: "Active",
    moderationStatus: "Approved"
  },
  {
    id: 2,
    title: "Machine Learning Engineer",
    company: "AI Frontier",
    companyLogo: "AF",
    location: "Bangalore",
    salary: "₹15–20 LPA",
    jobType: "Full Time",
    experience: "2-5 Years",
    category: "AI/ML",
    skills: ["Python", "PyTorch", "NLP", "TensorFlow"],
    description: "Design and implement state-of-the-art NLP models for our core product.",
    responsibilities: [
      "Research and develop ML models",
      "Deploy models to production",
      "Optimize model performance",
      "Analyze large datasets"
    ],
    requirements: [
      "Strong background in Machine Learning",
      "Proficiency in Python and PyTorch",
      "Experience with NLP techniques"
    ],
    preferredSkills: ["Hugging Face", "MLflow", "Kubernetes"],
    benefits: [
      "Competitive compensation",
      "Stock options",
      "Health & Wellness stipend"
    ],
    postedDate: "1 day ago",
    applicants: 89,
    featured: true,
    remote: true,
    rating: 4.8,
    status: "Active",
    moderationStatus: "Approved"
  },
  {
    id: 3,
    title: "Frontend React Developer",
    company: "TechNova",
    companyLogo: "TN",
    location: "Remote",
    salary: "₹8–12 LPA",
    jobType: "Full Time",
    experience: "2-4 Years",
    category: "Frontend Development",
    skills: ["React", "JavaScript", "TypeScript", "Tailwind CSS"],
    description: "Build reactive, accessible, and high-performance user interfaces for modern web applications.",
    responsibilities: [
      "Translate wireframes and designs into high-quality code",
      "Optimize components for maximum performance across devices",
      "Maintain code integrity and organization"
    ],
    requirements: [
      "2+ years of production React experience",
      "Deep understanding of modern CSS and state management",
      "Familiarity with RESTful APIs"
    ],
    preferredSkills: ["Next.js", "Vite", "GraphQL"],
    benefits: [
      "Remote first culture",
      "Home office setup stipend",
      "Annual education budget"
    ],
    postedDate: "3 days ago",
    applicants: 63,
    featured: false,
    remote: true,
    rating: 4.6,
    status: "Active",
    moderationStatus: "Approved"
  },
  {
    id: 4,
    title: "DevOps & Cloud Engineer",
    company: "Global Systems Inc.",
    companyLogo: "GS",
    location: "Bengaluru",
    salary: "₹12–18 LPA",
    jobType: "Full Time",
    experience: "3-6 Years",
    category: "DevOps",
    skills: ["Docker", "Kubernetes", "AWS", "Terraform", "CI/CD"],
    description: "Scale our cloud infrastructure and automate deployments across multi-region environments.",
    responsibilities: [
      "Automate cloud infrastructure with Terraform",
      "Manage and optimize Kubernetes clusters",
      "Improve CI/CD release cadence and reliability"
    ],
    requirements: [
      "Solid experience with AWS or GCP",
      "Strong Linux fundamentals and scripting",
      "Hands-on experience with container orchestration"
    ],
    benefits: [
      "Comprehensive medical cover",
      "Performance bonus",
      "Flexible working schedule"
    ],
    postedDate: "Just now",
    applicants: 19,
    featured: true,
    remote: false,
    rating: 4.7,
    status: "Active",
    moderationStatus: "Approved"
  },
  {
    id: 5,
    title: "UI/UX Product Designer",
    company: "PixelCraft Studios",
    companyLogo: "PC",
    location: "Mumbai",
    salary: "₹6–10 LPA",
    jobType: "Full Time",
    experience: "1-3 Years",
    category: "Design",
    skills: ["Figma", "UI Design", "User Research", "Wireframing"],
    description: "Craft intuitive, delightful user experiences from concept to final developer-ready design.",
    responsibilities: [
      "Conduct user research and usability testing",
      "Create high-fidelity interactive prototypes in Figma",
      "Collaborate closely with product managers and engineers"
    ],
    requirements: [
      "Proven portfolio showcasing web & mobile product design",
      "Mastery of Figma and design systems",
      "Strong empathetic mindset and visual design taste"
    ],
    benefits: [
      "Creative freedom",
      "Gym membership stipend",
      "Flexible hours"
    ],
    postedDate: "4 days ago",
    applicants: 51,
    featured: false,
    remote: true,
    rating: 4.4,
    status: "Active",
    moderationStatus: "Approved"
  },
  {
    id: 6,
    title: "Full Stack Node.js Engineer",
    company: "Global Systems Inc.",
    companyLogo: "GS",
    location: "Hyderabad",
    salary: "₹10–15 LPA",
    jobType: "Full Time",
    experience: "3-5 Years",
    category: "Software Development",
    skills: ["Node.js", "Express", "MongoDB", "React", "TypeScript"],
    description: "Own end-to-end features spanning React web clients, Express microservices, and MongoDB data pipelines.",
    responsibilities: [
      "Architect and implement RESTful & WebSocket APIs",
      "Write clean, test-driven JavaScript/TypeScript code",
      "Participate in agile sprints and code reviews"
    ],
    requirements: [
      "Proficient in Node.js ecosystem and async programming",
      "Strong knowledge of NoSQL database schema design",
      "Experience with JWT authentication and security best practices"
    ],
    benefits: [
      "Annual bonus",
      "Health & dental insurance",
      "Paid parental leave"
    ],
    postedDate: "5 days ago",
    applicants: 74,
    featured: false,
    remote: false,
    rating: 4.6,
    status: "Active",
    moderationStatus: "Approved"
  }
];

const seedData = async () => {
  try {
    const userCount = await User.countDocuments();
    let jobseekerUser, recruiterUser, adminUser;

    if (userCount === 0) {
      console.log('Seeding initial users...');

      jobseekerUser = await User.create({
        name: 'Anil Kumar',
        email: 'anil@example.com',
        password: 'password123',
        role: 'jobseeker',
        status: 'Active',
        title: 'AI/ML & Full Stack Developer',
        location: 'Chandigarh',
        phone: '+91 98765 43210',
        experience: '2 Years',
        education: 'MCA, Panjab University',
        skills: ['Python', 'React', 'Node.js', 'MongoDB', 'AI/ML'],
        bio: 'Passionate software developer interested in building high impact scalable applications.',
        linkedin: 'https://linkedin.com/in/example',
        portfolio: 'https://github.com/example',
        savedJobs: ['1', '2'],
        resume: {
          personal: {
            fullName: 'Anil Kumar',
            title: 'AI/ML & Full Stack Developer',
            email: 'anil@example.com',
            phone: '+91 98765 43210',
            location: 'Chandigarh, India',
            website: 'https://github.com/example',
            linkedin: 'https://linkedin.com/in/example',
          },
          summary: 'Forward-thinking developer with 2+ years of experience crafting modern web applications and AI-driven workflows.',
          skills: ['Python', 'JavaScript', 'React', 'Node.js', 'MongoDB', 'REST APIs', 'Git'],
          education: [
            {
              id: 1,
              degree: 'Master of Computer Applications (MCA)',
              institution: 'Panjab University',
              location: 'Chandigarh',
              startDate: '2021',
              endDate: '2023',
              gpa: '8.8 CGPA',
            }
          ],
          experience: [
            {
              id: 1,
              position: 'Junior Software Engineer',
              company: 'TechNova Solutions',
              location: 'Chandigarh',
              startDate: '2023',
              endDate: 'Present',
              current: true,
              description: 'Developed REST APIs in Node.js and interactive dashboard components in React.',
            }
          ],
          projects: [
            {
              id: 1,
              name: 'Nexora Career Platform',
              description: 'Full stack recruitment platform with interactive applicant tracking and resume builder.',
              technologies: 'React, Node.js, Express, MongoDB',
              link: 'https://github.com',
            }
          ],
          certifications: [],
          achievements: ['Hackathon Finalist 2024'],
        }
      });

      recruiterUser = await User.create({
        name: 'Rahul Sharma',
        email: 'rahul@technova.example',
        password: 'password123',
        role: 'recruiter',
        status: 'Active',
        title: 'Lead Talent Acquisition Partner',
        location: 'Chandigarh',
        phone: '+91 91234 56789',
        company: 'TechNova',
      });

      adminUser = await User.create({
        name: 'Platform Admin',
        email: 'admin@jobportal.com',
        password: 'password123',
        role: 'admin',
        status: 'Active',
        title: 'System Administrator',
        location: 'Headquarters',
      });

      console.log('Default users created: Seeker, Recruiter, Admin (password: password123)');
    } else {
      recruiterUser = await User.findOne({ role: 'recruiter' });
      jobseekerUser = await User.findOne({ role: 'jobseeker' });
    }

    // Seed companies if empty
    const companyCount = await Company.countDocuments();
    if (companyCount === 0) {
      console.log('Seeding initial companies...');
      await Company.create([
        {
          name: 'TechNova',
          logo: 'TN',
          industry: 'Software Development',
          size: '51-200',
          location: 'Chandigarh',
          website: 'https://technova.example.com',
          email: 'careers@technova.example',
          phone: '123-456-7890',
          description: 'Building intelligent software solutions for enterprise workflows.',
          founded: '2018',
          status: 'Approved',
          recruiter: recruiterUser ? recruiterUser._id : undefined,
          benefits: ['Health Insurance', 'Remote Work Options', 'Flexible Hours', 'Annual Bonus'],
          culture: 'We value innovation, transparency, and a strong work-life balance.',
        },
        {
          name: 'Global Systems Inc.',
          logo: 'GS',
          industry: 'IT Consulting & Cloud',
          size: '1000+',
          location: 'Bengaluru',
          website: 'https://globalsystems.example.com',
          email: 'hr@globalsystems.example',
          phone: '987-654-3210',
          description: 'Global IT consulting, digital transformation, and hybrid cloud solutions.',
          founded: '2005',
          status: 'Approved',
          benefits: ['Global Relocation Opportunities', 'Comprehensive Health Plan', 'Learning Allowance'],
          culture: 'Fast-paced, engineering-first, performance-driven.',
        },
        {
          name: 'AI Frontier',
          logo: 'AF',
          industry: 'Artificial Intelligence',
          size: '10-50',
          location: 'Bangalore',
          website: 'https://aifrontier.example.com',
          email: 'careers@aifrontier.example',
          phone: '800-111-2233',
          description: 'Pioneering frontier foundation models and enterprise agentic architectures.',
          founded: '2022',
          status: 'Approved',
          benefits: ['Generous Equity', 'Work from Anywhere', 'Wellness Stipend'],
          culture: 'Research mindset, curiosity, and rapid iteration.',
        }
      ]);
      console.log('Default companies created.');
    }

    // Seed jobs if empty
    const jobCount = await Job.countDocuments();
    if (jobCount === 0) {
      console.log('Seeding initial jobs...');
      for (const jobData of initialJobs) {
        await Job.create({
          ...jobData,
          postedBy: recruiterUser ? recruiterUser._id : undefined,
        });
      }
      console.log(`${initialJobs.length} default jobs seeded.`);
    }

    // Seed notifications if empty
    if (jobseekerUser) {
      const notifCount = await Notification.countDocuments({ user: jobseekerUser._id });
      if (notifCount === 0) {
        await Notification.create([
          {
            user: jobseekerUser._id,
            title: 'Welcome to Nexora!',
            message: 'Your profile has been initialized. Explore recommended jobs and apply with one click.',
            type: 'system',
            date: 'Today',
          },
          {
            user: jobseekerUser._id,
            title: 'Job Saved',
            message: 'Python Developer at TechNova was added to your Saved Jobs.',
            type: 'saved',
            date: 'Yesterday',
          }
        ]);
      }
    }
  } catch (err) {
    console.error('Error during data seeding:', err.message);
  }
};

module.exports = seedData;
