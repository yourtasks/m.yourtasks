import PressToCopy from "../shared/PressToCopy";
import Title from "./shared/Title";
import Description from "./shared/Description";
import { capitalizeWord } from "@/libs/capitalizeWord";

const Announcement = ({ title, description, source, owner }) => {
  return (
    <div className="p-1">
      <PressToCopy
        textToCopy={`${capitalizeWord(`${source.name}`)} (${capitalizeWord(
          source.section
        )})\n\n${title}\n${description}\n\n\posted by ${owner.firstname} ${
          owner.lastname
        }`}
      >
        <Title>{`${source.name} (${source.section}) - ${title}`}</Title>
        <Description>{description}</Description>
      </PressToCopy>
    </div>
  );
};

export default Announcement;
