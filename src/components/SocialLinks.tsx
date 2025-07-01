import { GithubLogoIcon } from "@phosphor-icons/react/dist/csr/GithubLogo";
import { XLogoIcon } from "@phosphor-icons/react/dist/csr/XLogo";
import { LinkedinLogoIcon } from "@phosphor-icons/react/dist/csr/LinkedinLogo";
import { IconContext } from "@phosphor-icons/react";
import "../index.css";

const SocialLinks = () => {
  return (
    <IconContext.Provider
      value={{
        size: 24,
        weight: "bold",
      }}
    >
      <div className="flex flex-row gap-4">
        <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer">
          <GithubLogoIcon size={24} className="social-icon" />
        </a>
        <a href="https://twitter.com/your-username" target="_blank" rel="noopener noreferrer">
          <XLogoIcon size={24} className="social-icon" />
        </a>
        <a href="https://linkedin.com/in/your-username" target="_blank" rel="noopener noreferrer">
          <LinkedinLogoIcon size={24} className="social-icon" />
        </a>
      </div>
    </IconContext.Provider>
  );
};

export default SocialLinks;
