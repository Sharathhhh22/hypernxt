export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const hoverCard = {
  rest: { y: 0, scale: 1, boxShadow: "0px 0px 0px rgba(0,0,0,0)" },
  hover: { 
    y: -4, 
    scale: 1.01,
    boxShadow: "0px 10px 20px rgba(139, 92, 246, 0.1)",
    transition: { type: "spring", stiffness: 300, damping: 20 }
  }
}
