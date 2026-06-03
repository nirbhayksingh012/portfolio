import {
  Brain, Cpu, Database, Cloud, Code2, Layers, Sparkles, Bot,
  GitBranch, Server, FlaskConical, Boxes,
} from "lucide-react";

export const profile = {
  name: "Nirbhay Singh",
  roles: ["AI Engineer", "Software Engineer", "Generative AI Developer" , "ML Engineer"],
  tagline:
    "Building scalable AI-powered applications, RAG pipelines, LLM systems, and modern web experiences.",
  email: "nirbhayksingh14@gmail.com",
  github: "https://github.com/nirbhayksingh012",
  linkedin: "https://www.linkedin.com/in/nirbhay-singh-5229542b2",
  location: "Jamshedpur, Jharkhand, India",
  avatar: "/images/profile.jpg",
};

export const experiences = [
  {
    role: "Software Engineer",
    company: "Anantron International Pvt Ltd",
    period: "Feb 2026 — Present",
    highlights: [
      "Architected production REST APIs serving real workloads",
      "Stack: Node.js, Express.js, FastAPI, React.js",
      "Owned performance optimization across hot paths",
      "Shipped production deployments end-to-end",
    ],
  },
  {
    role: "AI / ML Intern",
    company: "TATA BlueScope Steel",
    period: "May 2025 — Jul 2025",
    highlights: [
      "Built a FinBERT-based NLP pipeline for financial news",
      "Processed 500+ articles per day with 82% sentiment accuracy",
      "Delivered Streamlit dashboards for stakeholders",
      "Automated end-to-end ingestion → inference workflows",
    ],
  },
];

export const projects = [
  {
    title: "AI PDF Chatbot",
    blurb:
      "Production RAG pipeline with semantic search, multi-turn memory, and sub-2s responses.",
    tech: ["LangChain", "FAISS", "FastAPI", "Ollama", "AWS"],
    metrics: [
      { label: "Response time", value: "<2s" },
      { label: "Token cost", value: "−40%" },
      { label: "Memory", value: "Multi-turn" },
    ],
    demo: "#",
    github: "https://github.com/nirbhayksingh012/RAG_application.git",
    accent: "from-ai-violet to-ai-cyan",
  },
  {
    title: "AI Stock Sentiment Analyzer",
    blurb:
      "Real-time financial news pipeline with FinBERT scoring and LLM-generated executive summaries.",
    tech: ["FinBERT", "ChromaDB", "Groq API", "Streamlit"],
    metrics: [
      { label: "Accuracy", value: "82%" },
      { label: "Throughput", value: "+45%" },
      { label: "Latency", value: "Realtime" },
    ],
    demo: "#",
    github: "https://github.com/nirbhayksingh012/Stock-Sentiment-Analyzer.git",
    accent: "from-ai-cyan to-ai-emerald",
  },
  {
    title: "Movie Recommendation System",
    blurb:
      "Hybrid recommender over 45k+ titles with TF-IDF vectorization and cosine similarity.",
    tech: ["FastAPI", "Scikit-Learn", "PostgreSQL"],
    metrics: [
      { label: "Catalog", value: "45k+" },
      { label: "Method", value: "TF-IDF" },
      { label: "Ranking", value: "Cosine" },
    ],
    demo: "#",
    github: "https://github.com/nirbhayksingh012/Movie_recommendations.git",
    accent: "from-ai-pink to-ai-violet",
  },
];

export const skillGroups = [
  {
    label: "AI & GenAI",
    icon: Sparkles,
    items: ["RAG", "LLM Integration", "Prompt Engineering", "Semantic Search", "AI Agents", "Vector Embeddings"],
  },
  {
    label: "Machine Learning",
    icon: Brain,
    items: ["Scikit-Learn", "TensorFlow", "NLP", "FinBERT", "Transformers"],
  },
  {
    label: "Frameworks",
    icon: Layers,
    items: ["LangChain", "HuggingFace", "FastAPI", "React", "Node.js"],
  },
  {
    label: "Databases",
    icon: Database,
    items: ["PostgreSQL", "MongoDB", "Redis", "FAISS", "ChromaDB"],
  },
  {
    label: "Cloud & DevOps",
    icon: Cloud,
    items: ["AWS", "Docker", "Git", "GitHub"],
  },
  {
    label: "Languages",
    icon: Code2,
    items: ["Python", "Java", "SQL", "JavaScript"],
  },
];

export const certifications = [
  { name: "Oracle Generative AI Professional", issuer: "Oracle", icon: Bot },
  { name: "OCI Foundations Associate", issuer: "Oracle", icon: Cloud },
  { name: "HuggingFace LLM Fundamentals", issuer: "HuggingFace", icon: Sparkles },
  { name: "Google Cloud Generative AI", issuer: "Google Cloud", icon: Cpu },
  { name: "TensorFlow Deep Learning Fundamentals", issuer: "TensorFlow", icon: Brain },
  { name: "IBM LLM Fundamentals", issuer: "IBM", icon: Boxes },
  { name: "IBM NLP & Computer Vision", issuer: "IBM", icon: FlaskConical },
  { name: "JP Morgan Quantitative Research", issuer: "JP Morgan", icon: Server },
];

export const achievements = [
  { value: 500, suffix: "+", label: "Articles processed daily" },
  { value: 45000, suffix: "+", label: "Movies analyzed" },
  { value: 82, suffix: "%", label: "NLP accuracy" },
  { value: 40, suffix: "%", label: "Token cost reduction" },
  { value: 35, suffix: "%", label: "Latency reduction" },
];

export const focus = [
  { icon: Sparkles, label: "Generative AI" },
  { icon: Brain, label: "Machine Learning" },
  { icon: Bot, label: "NLP" },
  { icon: Layers, label: "RAG Pipelines" },
  { icon: Code2, label: "Full Stack Development" },
  { icon: Cloud, label: "Cloud Deployment" },
  { icon: GitBranch, label: "DevOps & CI/CD" },
  { icon: Server, label: "Production Systems" },
];
