import { useEffect, useState } from "react";

const useTypingEffect = (
  text: string,
  speed: number = 50,
  shouldRestart: boolean
) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [text, speed, shouldRestart]);

  return displayedText;
};

const ServiceCollectRobot = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [restartAnimation, setRestartAnimation] = useState(false);
  const description =
    " Welcome to ExamBot, your intelligent companion for exam data collection and analysis. We streamline the process of gathering, organizing, and interpreting exam results to help educational institutions make data-driven decisions.";
  const displayedDescription = useTypingEffect(
    description,
    30,
    restartAnimation
  );

  const handleMouseEnter = () => {
    setIsHovered(true);
    setRestartAnimation((prev) => !prev);
  };

  return (
    <div className="absolute right-5 bottom-14 hidden md:block">
      <div className="relative w-64 h-64">
        {isHovered && (
          <div className="absolute bottom-full left-9 transform -translate-x-1/2 mb-4 w-80 z-10">
            <div className="bg-white rounded-lg shadow-xl p-6 relative">
              <div className="absolute -bottom-2 right-5 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45"></div>
              <h3 className="text-xl font-bold mb-2 text-primary">
                Our Services
              </h3>
              <p className="text-sm text-gray-600">{displayedDescription}</p>
            </div>
          </div>
        )}
        <div
          className="w-full h-full overflow-hidden cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setIsHovered(false)}>
          <img
            src="/data-collector.png"
            alt="Robot Service Assistant"
            width={256}
            height={256}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceCollectRobot;
