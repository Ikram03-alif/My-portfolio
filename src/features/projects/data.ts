export interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
    imageUrl: string;
    demoUrl?: string; // Optional
    repoUrl?: string; // Optional
}

export const projects: Project[] = [
    {
        id: "1",
        title: "Olympia Education LMS",
        description: "A comprehensive Learning Management System built with Laravel. Features include user authentication, course enrollment, learning material management, and content access control. Designed for scalability and user-friendly interaction.",
        tags: ["Laravel", "PHP", "MySQL", "Bootstrap", "JavaScript"],
        imageUrl: "/lms-preview.jpg",
        demoUrl: "#",
    },
    {
        id: "2",
        title: "International Halal Economic Awards",
        description: "Official website for IHEA. Developed content management features for award categories, event details, and winner showcases. Focused on performance optimization and cross-browser compatibility.",
        tags: ["Laravel", "HTML/CSS", "JavaScript", "SEO"],
        imageUrl: "/ihea-preview.jpg",
        demoUrl: "#",
    },
    {
        id: "3",
        title: "Smart Hafazan Tracker",
        description: "Mobile application for Pusat Tahfiz An-Nur. Built with Flutter and Firebase to help Ustaz track student Quran memorization progress digitally. Features role-based access control and real-time data sync.",
        tags: ["Flutter", "Firebase", "Mobile App", "Dart"],
        imageUrl: "/hafazan-preview.jpg",
        demoUrl: "#",
    },
    {
        id: "4",
        title: "Olympia Sales Record",
        description: "Java-based internal system for tracking sales data. Implemented robust data entry validation, reporting features, and error handling to ensure data integrity.",
        tags: ["Java", "Swing", "SQL", "Desktop App"],
        imageUrl: "/sales-preview.jpg",
        demoUrl: "#",
    },
];

export const experience = [
    {
        role: "Web Developer Intern",
        company: "Olympia Education Malaysia",
        period: "Sept 2024 - Present", // Assuming current or recent based on 2025 context
        description: "Developed and maintained web apps using Laravel and PHP. Collaborated on system analysis and documentation."
    }
];

export const education = [
    {
        school: "Universiti Teknologi MARA (UiTM) Shah Alam",
        degree: "Bachelor of Information Systems (Hons.) Engineering",
        year: "2023 - 2026"
    },
    {
        school: "Kolej Matrikulasi Kelantan",
        degree: "Accounting",
        year: "2020 - 2023",
        gpa: "3.54"
    }
];
