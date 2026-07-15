import {
  Brain, Cpu, Database, Cloud, Code2, Layers, Sparkles, Bot,
  GitBranch, Server, FlaskConical, Boxes,
  Search, MessageSquare, Workflow, Network, Sigma,
  Zap, FileCode, Globe, Container, Hash,
} from "lucide-react";

export const profile = {
  name: "Nirbhay Singh",
  roles: ["AI Engineer", "Software Engineer", "Generative AI Developer", "ML Engineer"],
  tagline:
  "AI/ML Engineer building production-grade GenAI systems — custom LLMs, RAG pipelines, and real-time NLP agents used by real teams",
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
    title: "Rudra — Custom AI Agent & MiniGPT",
    blurb:
      "Custom 6.5M-parameter Transformer LLM with a ReAct agent framework for autonomous tool use, trained from scratch and deployed for real-time inference.",
    image: "/images/projects/rudra.png",
    tech: ["PyTorch", "FastAPI", "Next.js", "TypeScript"],
    metrics: [
      { label: "Parameters", value: "6.5M" },
      { label: "Agent", value: "ReAct" },
      { label: "Inference", value: "4GB GPU" },
    ],
    demo: "#",
    github: "https://github.com/nirbhayksingh012/Rudra.git",
    accent: "from-ai-emerald to-ai-cyan",
  },
  {
    title: "AI PDF Chatbot",
    blurb:
      "Production RAG pipeline with semantic search, multi-turn memory, and sub-2s responses.",
    image: "/images/projects/ai-pdf-chatbot.png",
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
    image: "/images/projects/ai-stock-sentiment.png",
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
    image: "/images/projects/movie-recommendation.png",
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

export const skills = [
  // AI & GenAI
  { name: "RAG", icon: Workflow, category: "AI & GenAI" },
  { name: "LLM Integration", icon: Bot, category: "AI & GenAI" },
  { name: "Prompt Engineering", icon: MessageSquare, category: "AI & GenAI" },
  { name: "Semantic Search", icon: Search, category: "AI & GenAI" },
  { name: "AI Agents", icon: Sparkles, category: "AI & GenAI" },
  { name: "Vector Embeddings", icon: Network, category: "AI & GenAI" },
  // Machine Learning
  { name: "Scikit-Learn", icon: Sigma, category: "Machine Learning" },
  { name: "TensorFlow", icon: Brain, category: "Machine Learning" },
  { name: "NLP", icon: MessageSquare, category: "Machine Learning" },
  { name: "FinBERT", icon: Cpu, category: "Machine Learning" },
  { name: "Transformers", icon: Zap, category: "Machine Learning" },
  // Frameworks
  { name: "LangChain", icon: Workflow, category: "Frameworks" },
  { name: "HuggingFace", icon: Bot, category: "Frameworks" },
  { name: "FastAPI", icon: Zap, category: "Frameworks" },
  { name: "React", icon: Layers, category: "Frameworks" },
  { name: "Node.js", icon: Server, category: "Frameworks" },
  // Databases
  { name: "PostgreSQL", icon: Database, category: "Databases" },
  { name: "MongoDB", icon: Database, category: "Databases" },
  { name: "Redis", icon: Zap, category: "Databases" },
  { name: "FAISS", icon: Search, category: "Databases" },
  { name: "ChromaDB", icon: Boxes, category: "Databases" },
  // Cloud & DevOps
  { name: "AWS", icon: Cloud, category: "Cloud & DevOps" },
  { name: "Docker", icon: Container, category: "Cloud & DevOps" },
  { name: "Git", icon: GitBranch, category: "Cloud & DevOps" },
  { name: "GitHub", icon: Globe, category: "Cloud & DevOps" },
  // Languages
  { name: "Python", icon: Code2, category: "Languages" },
  { name: "Java", icon: FileCode, category: "Languages" },
  { name: "SQL", icon: Hash, category: "Languages" },
  { name: "JavaScript", icon: Code2, category: "Languages" },
];

export const certifications = [
  { name: "Oracle Generative AI Professional", issuer: "Oracle", icon: Bot, color: "#F80000", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oracle/oracle-original.svg" },
  { name: "OCI Foundations Associate", issuer: "Oracle", icon: Cloud, color: "#F80000", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oracle/oracle-original.svg" },
  { name: "HuggingFace LLM Fundamentals", issuer: "HuggingFace", icon: Sparkles, color: "#FFD21E", logo: "https://cdn.simpleicons.org/huggingface/FFD21E" },
  { name: "Google Cloud Generative AI", issuer: "Google Cloud", icon: Cpu, color: "#4285F4", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg" },
  { name: "TensorFlow Deep Learning Fundamentals", issuer: "TensorFlow", icon: Brain, color: "#FF6F00", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" },
  { name: "IBM LLM Fundamentals", issuer: "IBM", icon: Boxes, color: "#0530AD", logo: "https://cdn.simpleicons.org/ibm/0530AD" },
  { name: "IBM NLP & Computer Vision", issuer: "IBM", icon: FlaskConical, color: "#0530AD", logo: "https://cdn.simpleicons.org/ibm/0530AD" },
  { name: "JP Morgan Quantitative Research", issuer: "JP Morgan", icon: Server, color: "#006CB8", logo: "https://cdn.simpleicons.org/jpmorgan/ffffff" },
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
